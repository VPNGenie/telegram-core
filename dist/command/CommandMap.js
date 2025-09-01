export class CommandMap {
    commands = new Map();
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
    async dispatch(sender, text) {
        const [name, ...args] = text.slice(1).split(/\s+/);
        const command = this.commands.get(name.toLowerCase());
        if (!command)
            return sender.sendMessage(`Неизвестная команда: ${name}`);
        await command.execute(sender, args);
    }
}
//# sourceMappingURL=CommandMap.js.map