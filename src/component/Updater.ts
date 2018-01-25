import Component from "../Component";
import Rendering from "../Rendering";

export default class Updater implements Component {

    constructor(private component: () => Component | null) { }

    private built: Component | null = null;

    render(element: Element) {

        let state: { component: Component, rendering: Rendering } | null = null;

        return {
            update: () => {

                if (state === null || state.component !== this.built) {
                    const component = this.built || new Component();
                    if (state !== null)
                        state.rendering.destroy();
                    const rendering = component.render(element);
                    state = {
                        component: component,
                        rendering: rendering
                    }
                }

                if (state !== null)
                    state.rendering.update();
            },

            destroy: () =>
                state !== null && state.rendering.destroy()
        }
    }

    async load() {
        const component = this.component() || new Component();
        await component.load();
        this.built = component;
    }
}