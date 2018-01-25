import Component from "../Component";

export default class Builder implements Component {
    private built: Component | null = null;

    constructor(private component: Promise<Component>) { }

    render(element: Element) {
        return (this.built || new Component())
            .render(element);
    }

    async load() {
        this.built = await this.component;
        await this.built.load();
    }
}