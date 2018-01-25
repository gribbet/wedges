import Component from "../Component";
import Chain from "./Chain";
import KeyedRepeater from "./KeyedRepeater";

export default class AsyncKeyedRepeater<T> extends Chain {
    private built: T[] = [];

    constructor(
        private keys: () => Promise<T[]>,
        component: (T) => Component) {
        super(new KeyedRepeater<T>(() => this.built, component));
    }

    async load() {
        this.built = await this.keys();
        await super.load();
    }
}