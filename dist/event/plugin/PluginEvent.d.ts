import type { Plugin } from "../../plugin/Plugin.js";
import { Event } from "../Event.js";
export declare abstract class PluginEvent extends Event {
    private plugin;
    constructor(plugin: Plugin);
    getPlugin(): Plugin;
}
//# sourceMappingURL=PluginEvent.d.ts.map