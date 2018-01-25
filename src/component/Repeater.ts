import Component from "../Component";
import Rendering from "../Rendering";
import { flatten } from "../util";

export default class Repeater implements Component {

    constructor(private repeated: Component[]) { }

    render(element: Element) {

        const templates: Element[] = [].slice.call(element.children);
        templates.forEach(_ => element.removeChild(_));

        const renderings = flatten<Rendering>(
            this.repeated.map(component =>
                templates.map(template => {

                    const clone = <Element>template.cloneNode(true);
                    const rendering = component.render(clone);
                    element.appendChild(clone);

                    return {
                        update: () =>
                            rendering.update(),

                        destroy: () => {
                            rendering.destroy();
                            element.removeChild(clone);
                        }
                    };
                })));

        return {
            update: () =>
                renderings.forEach(_ => _.update()),

            destroy: () => {
                renderings.forEach(_ => _.destroy());
                templates.forEach(_ => element.appendChild(_));
            }
        };
    }

    async load() {
        await Promise.all(
            this.repeated.map(_ => _.load()));
    }
}