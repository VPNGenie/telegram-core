import type { Command } from "./Command.js";
import type { CommandSender } from "./CommandSender.js";
export declare class CommandMap {
    private commands;
    /**
     * @param {Command} command
     *
     * @memberOf CommandMap
     */
    register(command: Command): void;
    dispatch(sender: CommandSender, text: string): Promise<void>;
}
//# sourceMappingURL=CommandMap.d.ts.map