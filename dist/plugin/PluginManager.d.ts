import type { Server } from "../Server.js";
import type { PluginBase } from "./PluginBase.js";
declare class PluginManager {
    private plugins;
    getPlugins(): PluginBase[];
    loadPlugins(server: Server): Promise<void>;
    disableAll(): Promise<void>;
}
declare const _default: PluginManager;
export default _default;
//# sourceMappingURL=PluginManager.d.ts.map