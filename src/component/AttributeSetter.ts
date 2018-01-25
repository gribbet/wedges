import Component from "../Component";

export default class AttributeSetter implements Component {
    constructor(private attribute: string, private value: () => string) { }

    render(element: Element) {
        const original = element.getAttribute(this.attribute);

        return {
            update: () =>
                element.setAttribute(this.attribute, this.value()),
            destroy: () => {
                if (original === null)
                    element.removeAttribute(this.attribute);
                else
                    element.setAttribute(this.attribute, original);
            }
        }
    }

    async load() { }
}