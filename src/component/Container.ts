import Component from "../Component";

export default class Container implements Component {

    constructor(private children: Component[]) { }

    render(element: Element) {

        const renderings = this.children.map(_ => _.render(element));

        return {
            update: () =>
                renderings.forEach(_ => _.update()),
            destroy: () =>
                renderings.forEach(_ => _.destroy())
        }
    }

    async load() {
        await Promise.all(
            this.children.map(_ => _.load()));
    }
}