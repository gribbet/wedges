import Component from "../Component";

export default class Template implements Component {

    constructor(template: Element | string) {

        if (typeof template === "string") {
            const parser = new DOMParser();
            const document = parser.parseFromString(template, "text/html");
            this.template = [].slice.call(document.body.children);
        } else
            this.template = [<Element>template.cloneNode(true)];
    }

    private template: Element[];

    render(element: Element) {

        const template = this.template.map(_ =>
            _.cloneNode(true));

        template.forEach(_ =>
            element.appendChild(_));

        return {
            update: () => undefined,
            destroy: () =>
                template.forEach(_ =>
                    element.removeChild(_))
        };
    }

    async load() { }
}