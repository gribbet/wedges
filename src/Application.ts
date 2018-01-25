import Component from "./Component";

export default class Application {
    private loading: (loading: boolean) => void =
        loading => undefined;

    constructor(
        private component: Component,
        private element: Element,
        loading?: (loading: boolean) => void
    ) {
        this.loading = loading || this.loading;
    }

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
            this.loading(true);
            if (trigger) trigger();
            await this.component.load();
            this.start();
            (await this.rendering).update();
            this.loading(false);
        })
    }

    async stop() {
        (await this.rendering).destroy();
    }
}