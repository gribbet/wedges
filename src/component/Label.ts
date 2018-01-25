import Component from "../Component";

export default class Label implements Component {

    constructor(private value: () => string) { }

    render(element: Element) {

        const original = element.textContent;

        return {
            update: () =>
                element.textContent = this.value(),
            destroy: () =>
                element.textContent = original
        }
    }

    async load() { }
}