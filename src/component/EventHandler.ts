import Component from "../Component";

export default class EventHandler implements Component {

    constructor(
        private event: string,
        private handler: (Event) => void) { }

    render(element: Element) {

        const handler = (event: Event) => this.handler(event);
        element.addEventListener(this.event, handler);

        return {
            update: () => undefined,
            destroy: () =>
                element.removeEventListener(this.event, handler)
        };
    }

    async load() { }
}