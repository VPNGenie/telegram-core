import type { Server } from "../Server.js";
import type { PluginBase } from "./PluginBase.js";
declare class PluginManager {
    private plugins;
    private listeners;
    getPlugins(): PluginBase[];
    loadPlugins(server: Server): Promise<void>;
    disableAll(): Promise<void>;
    callEvent(event: any): Promise<void>;
    registerEvents(listener: any, plugin: PluginBase): void;
}
declare const _default: PluginManager;
export default _default;
//# sourceMappingURL=PluginManager.d.ts.map