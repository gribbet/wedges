import Rendering from "./Rendering";

interface Component {
    render(element: Element): Rendering;
    load(): Promise<void>;
}

class Component implements Component {

    render(element: Element): Rendering {
        return {
            update: () => undefined,
            destroy: () => undefined
        };
    }

    async load() { }
}

export default Component;
