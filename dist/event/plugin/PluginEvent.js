import { Event } from "../Event.js";
export class PluginEvent extends Event {
    plugin;
    constructor(plugin) {
        super();
        this.plugin = plugin;
    }
    getPlugin() {
        return this.plugin;
    }
}
//# sourceMappingURL=PluginEvent.js.map