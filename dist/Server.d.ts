import { CommandMap } from "./command/CommandMap.js";
import PluginManager from "./plugin/PluginManager.js";
export declare class Server {
    private token;
    private bot;
    private commandMap;
    private pluginsPath;
    private configPath;
    config: any;
    constructor(token: string);
    private initFiles;
    /**
     * @returns {CommandMap}
     *
     * @memberOf Server
     */
    getCommandMap(): CommandMap;
    getPluginManager(): typeof PluginManager;
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=Server.d.ts.map