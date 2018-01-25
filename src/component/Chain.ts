import Component from "../Component";

export default class Chain implements Component {

    constructor(private component: Component) { }

    render(element: Element) {
        return this.component.render(element);
    }

    async load() {
        await this.component.load();
    }
}