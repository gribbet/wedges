import Component from "../Component";
import Rendering from "../Rendering";

export default class KeyedRepeater<T> implements Component {
    private built: { key: T, component: Component }[] = [];

    constructor(
        private keys: () => T[],
        private component: (key: T) => Component) { }

    render(element: Element) {
        let state: { key: T, renderings: Rendering[] }[] = [];

        const templates: Element[] = [].slice.call(element.children);
        templates.forEach(_ => element.removeChild(_));

        return {
            update: () => {

                const removed = state.filter(state =>
                    this.built.find(_ => _.key === state.key) === undefined);
                removed.forEach(_ => _.renderings.forEach(_ => _.destroy()));

                state = this.built.map((built, i) => {

                    const existing = state.find(_ => _.key === built.key);

                    if (existing !== undefined) {

                        existing.renderings.forEach(_ => _.update());
                        return existing;

                    } else {

                        return {
                            key: built.key,
                            renderings: templates.map((template, j) => {

                                const clone = <Element>template.cloneNode(true);
                                const rendering = built.component.render(clone);
                                rendering.update();
                                element.insertBefore(clone,
                                    element.children[i * templates.length + j]);

                                return {
                                    update: () =>
                                        rendering.update(),
                                    destroy: () => {
                                        element.removeChild(clone);
                                        rendering.destroy();
                                    }
                                };
                            })
                        };
                    }
                });
            },

            destroy: () => {
                state.forEach(_ => _.renderings.forEach(_ => _.destroy()));
                templates.forEach(_ => element.appendChild(_));
            }
        };
    }

    async load() {
        this.built = await Promise.all(
            this.keys()
                .map(async key => {

                    const existing = this.built.find(_ => _.key === key);
                    if (existing !== undefined) {
                        await existing.component.load();
                        return existing;
                    }

                    const component = this.component(key);
                    await component.load();
                    return {
                        key: key,
                        component: component
                    };
                }));
    }
}