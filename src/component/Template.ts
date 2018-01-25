import Component from "../Component";

export default class Template implements Component {
    private template: Element[];

    constructor(template: Element | string) {

        if (typeof template === "string") {
            const parser = new DOMParser();
            const document = parser.parseFromString(template, "text/html");
            this.template = [].slice.call(document.body.children);
        } else
            this.template = [<Element>template.cloneNode(true)];
    }

    render(element: Element) {

        this.template.forEach(_ =>
            element.appendChild(_));

        return {
            update: () => undefined,
            destroy: () =>
                this.template.forEach(_ =>
                    element.removeChild(_))
        };
    }

    async load() { }
}