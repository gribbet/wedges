import Component from "./Component";

export default class Application {

    constructor(
        private component: Component,
        private element: Element,
        loading?: (loading: boolean) => void
    ) {
        this.loading = loading || this.loading;
    }

    private loading: (loading: boolean) => void =
        loading => undefined;

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

        const current = this.last
            .then(async () => {

                this.loading(true);

                try {
                    if (trigger) trigger();

                    if (this.last !== current)
                        return;

                    await this.component.load();

                    this.start();

                    (await this.rendering).update();

                } finally {
                    this.loading(false);
                }
            });

        return this.last = current;

    }

    async stop() {
        (await this.rendering).destroy();
    }
}