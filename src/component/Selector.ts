import Component from "../Component";

export default class Selector implements Component {

    constructor(
        private selector: string,
        private component: Component
    ) { }

    render(element: Element) {

        const selected: Element[] = [].slice.call(
            element.querySelectorAll(this.selector));

        let renderings = selected.map(_ =>
            this.component.render(_));

        return {
            update: () =>
                renderings.forEach(_ => _.update()),

            destroy: () =>
                renderings.forEach(_ => _.destroy())
        };
    }

    async load() {
        await this.component.load();
    }
}