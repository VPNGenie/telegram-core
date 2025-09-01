import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";

export abstract class PluginBase {
    constructor (
        public readonly name: string
    ) { }

    abstract onEnable (server: Server) : void | Promise<void>;
    onDisable?(server: Server): void | Promise<void>;

    onCommand?(sender: CommandSender, command: string, args: string[], server: Server): Promise<boolean> | boolean;
}