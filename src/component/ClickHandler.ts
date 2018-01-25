import EventHandler from "./EventHandler";

export default class ClickHandler extends EventHandler {

    constructor(handler: () => void) {
        super("click", event => {
            event.preventDefault();
            event.stopPropagation();
            handler();
        });
    }
}