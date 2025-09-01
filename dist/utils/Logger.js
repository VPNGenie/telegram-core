export default class Logger {
    tag;
    constructor(tag) {
        this.tag = tag;
    }
    info(msg) {
        console.info(`[${this.tag}] [INFO] ${msg}`);
    }
    warn(msg) {
        console.warn(`[${this.tag}] [WARN] ${msg}`);
    }
    error(msg) {
        console.error(`[${this.tag}] [ERROR] ${msg}`);
    }
}
//# sourceMappingURL=Logger.js.map