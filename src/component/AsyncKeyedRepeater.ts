import Component from "../Component";
import Chain from "./Chain";
import KeyedRepeater from "./KeyedRepeater";

export default class AsyncKeyedRepeater<T> extends Chain {

    constructor(
        private keys: () => Promise<T[]>,
        component: (key: T) => Component
    ) {
        super(new KeyedRepeater<T>(() => this.built, component));
    }

    private built: T[] = [];

    async load() {
        this.built = await this.keys();
        await super.load();
    }
}