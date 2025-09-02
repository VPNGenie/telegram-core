import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";
import Logger from "../utils/Logger.js";
import type { Plugin } from "./Plugin.js";
export declare abstract class PluginBase implements Plugin {
    private logger;
    private server;
    private enabled;
    private description;
    constructor(description: any, server: Server);
    getDescription(): string;
    getVersion(): any;
    abstract onEnable(): void | Promise<void>;
    abstract onDisable(): void | Promise<void>;
    onCommand?(sender: CommandSender, command: string, args: string[]): Promise<boolean> | boolean;
    registerEvents(listener: any, server: Server): void;
    setEnabled(boolean?: boolean): void;
    isEnabled(): boolean;
    isDisabled(): boolean;
    getServer(): Server;
    getLogger(): Logger;
    getName(): any;
}
//# sourceMappingURL=PluginBase.d.ts.map