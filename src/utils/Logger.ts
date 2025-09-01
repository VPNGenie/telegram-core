export default class Logger {
    constructor (private tag: string) { }

    info (msg: string) {
        console.info(`[${this.tag}] [INFO] ${msg}`);
    }

    warn (msg: string) {
        console.warn(`[${this.tag}] [WARN] ${msg}`);
    }

    error (msg: string) {
        console.error(`[${this.tag}] [ERROR] ${msg}`);
    }
}