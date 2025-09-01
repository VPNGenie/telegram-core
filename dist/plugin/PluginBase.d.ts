import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";
export declare abstract class PluginBase {
    readonly name: string;
    constructor(name: string);
    abstract onEnable(server: Server): void | Promise<void>;
    onDisable?(server: Server): void | Promise<void>;
    onCommand?(sender: CommandSender, command: string, args: string[], server: Server): Promise<boolean> | boolean;
}
//# sourceMappingURL=PluginBase.d.ts.map