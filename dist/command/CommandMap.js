import { PluginsCommand } from "./defaults/PluginsCommand.js";
export class CommandMap {
    commands = new Map();
    constructor() {
        this.registerDefaults();
    }
    /**
     * @param {Command} command
     *
     * @memberOf CommandMap
     */
    register(command) {
        this.commands.set(command.name.toLowerCase(), command);
        for (const alias of command.aliases) {
            this.commands.set(alias.toLowerCase(), command);
        }
    }
    async dispatch(sender, name, args) {
        const command = this.commands.get(name.toLowerCase());
        if (!command)
            return sender.sendMessage(`Неизвестная команда: ${name}`);
        await command.execute(sender, args);
    }
    registerDefaults() {
        this.register(new PluginsCommand());
    }
}
//# sourceMappingURL=CommandMap.js.map