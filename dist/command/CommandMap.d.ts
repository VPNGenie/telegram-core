import type { Command } from "./Command.js";
import type { CommandSender } from "./CommandSender.js";
export declare class CommandMap {
    private commands;
    constructor();
    /**
     * @param {Command} command
     *
     * @memberOf CommandMap
     */
    register(command: Command): void;
    dispatch(sender: CommandSender, name: string, args: string[]): Promise<void>;
    private registerDefaults;
}
//# sourceMappingURL=CommandMap.d.ts.map