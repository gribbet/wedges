import Template from "./Template";

export default class Styler extends Template {

    constructor(css: string) {
        super(`<body><style>${css}</style></body>`);
    }
}