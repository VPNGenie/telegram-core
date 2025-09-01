import type { CommandSender } from "./CommandSender.js";

export abstract class Command {
    constructor(
        public readonly name: string,
        public readonly description: string = '',
        public readonly aliases: string[] = []
    ) {}

    abstract execute (sender: CommandSender, args: string[]): Promise<void> | void;
}