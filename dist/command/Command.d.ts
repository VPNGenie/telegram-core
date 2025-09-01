import type { CommandSender } from "./CommandSender.js";
export declare abstract class Command {
    readonly name: string;
    readonly description: string;
    readonly aliases: string[];
    constructor(name: string, description?: string, aliases?: string[]);
    abstract execute(sender: CommandSender, args: string[]): Promise<void> | void;
}
//# sourceMappingURL=Command.d.ts.map