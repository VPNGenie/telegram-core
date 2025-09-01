import type { Command } from "./Command.js";
import type { CommandSender } from "./CommandSender.js";
import { PluginsCommand } from "./defaults/PluginsCommand.js";

export class CommandMap {
    private commands = new Map<string, Command>();

    constructor () {
        this.registerDefaults();
    }

    /**
     * @param {Command} command 
     * 
     * @memberOf CommandMap
     */
    register (command: Command) {
        this.commands.set(command.name.toLowerCase(), command);
        for (const alias of command.aliases) {
            this.commands.set(alias.toLowerCase(), command);
        }
    }

    async dispatch(sender: CommandSender, name: string, args: string[]) {
        const command = this.commands.get(name.toLowerCase());
        if (!command) return sender.sendMessage(`Неизвестная команда: ${name}`);
        await command.execute(sender, args);
    }

    private registerDefaults () {
        this.register(new PluginsCommand());
    }
}