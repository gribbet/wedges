import Component from "../Component";

export default class ClassToggler implements Component {

    constructor(
        private className: string,
        toggled?: () => boolean
    ) {
        this.toggled = toggled || (() => true);
    }

    private toggled: () => boolean;

    render(element: Element) {

        const original = element.classList.contains(this.className);

        return {
            update: () =>
                element.classList.toggle(this.className, this.toggled()),

            destroy: () =>
                element.classList.toggle(this.className, original)
        };
    }

    async load() { }
}