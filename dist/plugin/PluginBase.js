import Logger from "../utils/Logger.js";
export class PluginBase {
    logger;
    server;
    enabled = false;
    description;
    constructor(description, server) {
        this.server = server;
        this.description = description;
        this.logger = new Logger(description.name);
    }
    getLogger() {
        return this.logger;
    }
    getName() {
        return this.description.name;
    }
    getVersion() {
        return this.description.version;
    }
    registerEvents(listener, server) {
        server.getPluginManager().registerEvents(listener, this);
    }
    setEnabled(boolean = true) {
        this.enabled = boolean;
    }
    isEnabled() {
        return this.enabled;
    }
    isDisabled() {
        return this.enabled === false;
    }
    getServer() {
        return this.server;
    }
}
//# sourceMappingURL=PluginBase.js.map