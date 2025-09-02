import type { Plugin } from "../../plugin/Plugin.js";
import { PluginEvent } from "./PluginEvent.js";

export class PluginDisableEvent extends PluginEvent {
    constructor (plugin: Plugin) {
        super(plugin)
    }
}