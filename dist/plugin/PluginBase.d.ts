import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";
import Logger from "../utils/Logger.js";
export declare abstract class PluginBase {
    private logger;
    private server;
    private enabled;
    private description;
    constructor(description: any, server: Server);
    getLogger(): Logger;
    getName(): any;
    getVersion(): any;
    abstract onEnable(): void | Promise<void>;
    abstract onDisable(): void | Promise<void>;
    onCommand?(sender: CommandSender, command: string, args: string[]): Promise<boolean> | boolean;
    setEnabled(boolean?: boolean): void;
    isEnabled(): boolean;
    isDisabled(): boolean;
    getServer(): Server;
}
//# sourceMappingURL=PluginBase.d.ts.map