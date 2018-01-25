import AttributeSetter from "./AttributeSetter";
import Container from "./Container";
import EventHandler from "./EventHandler";

export default class InputHandler extends Container {

    constructor(
        getter: () => string,
        setter: (value: string) => void
    ) {
        super([
            new AttributeSetter("value", getter),
            new EventHandler("input", event =>
                setter((<HTMLInputElement>event.target).value))
        ]);
    }
}