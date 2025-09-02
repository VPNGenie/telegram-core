import type { Plugin } from "../../plugin/Plugin.js";
import { Event } from "../Event.js";

export abstract class PluginEvent extends Event {
    constructor (
        private plugin: Plugin
    ) {
        super();
    }

    getPlugin (): Plugin {
        return this.plugin;
    }
}