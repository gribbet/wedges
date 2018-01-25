import Component from "../Component";
import Rendering from "../Rendering";

export default class Chain implements Component {

    constructor(private component: Component) { }

    render(element: Element): Rendering {
        return this.component.render(element);
    }

    async load() {
        await this.component.load();
    }
}