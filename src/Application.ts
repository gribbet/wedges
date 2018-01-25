import Component from "./Component";

export default class Application {

    constructor(
        private component: Component,
        private element: Element
    ) { }

    private readonly started = new Promise(resolve =>
        this.start = async () => {
            resolve();
            await this.started;
        });
    private readonly rendering = this.started
        .then(_ => this.component.render(this.element));
    private last = Promise.resolve();

    async start() { }

    update(trigger?: () => void) {
        return this.last = this.last.then(async () => {
            console.log("Update");
            if (trigger) trigger();
            await this.component.load();
            this.start();
            (await this.rendering).update();
        })
    }

    async stop() {
        (await this.rendering).destroy();
    }
}