import Component from "../Component";

export default class Remover implements Component {
    constructor(private removed: () => boolean) { }

    render(element: Element) {
        const children: Element[] = [].slice.call(element.children);

        return {
            update: () => {
                const removed = this.removed();
                if (removed)
                    children
                        .filter(_ => _.parentNode !== null)
                        .map(_ => element.removeChild(_))
                else
                    children
                        .filter(_ => _.parentNode === null)
                        .map(_ => element.appendChild(_));
            },
            destroy: () =>
                children
                    .filter(_ => _.parentNode === null)
                    .map(_ => element.appendChild(_))
        }
    }

    async load() { }
}