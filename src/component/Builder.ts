import Component from "../Component";
import Rendering from "../Rendering";

export default class Builder implements Component {
    private built: Component | null = null;

    constructor(private component: Promise<Component>) { }

    render(element: Element): Rendering {
        return (this.built || new Component())
            .render(element);
    }

    async load() {
        this.built = await this.component;
        await this.built.load();
    }
}