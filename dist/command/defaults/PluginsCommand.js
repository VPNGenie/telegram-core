import { Command } from "../Command.js";
export class PluginsCommand extends Command {
    constructor() {
        super('plugins', 'Список плагинов');
    }
    async execute(sender, args) {
        const plugins = sender.getServer().getPluginManager().getPlugins();
        const list = plugins
            .map(p => `${p.getName()} [${p.isEnabled() ? 'Enabled' : 'Disabled'}]`)
            .join(', ');
        return sender.sendMessage(`Плагины (${plugins.length}): ${list}`);
    }
}
//# sourceMappingURL=PluginsCommand.js.map