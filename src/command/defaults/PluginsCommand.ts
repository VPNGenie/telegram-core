import { Command } from "../Command.js";
import type { CommandSender } from "../CommandSender.js";

export class PluginsCommand extends Command {
    constructor () {
        super('plugins', 'Список плагинов');
    }

    async execute(sender: CommandSender, args: string[]): Promise<void> {
         const plugins = sender.getServer().getPluginManager().getPlugins();
         const list = plugins
            .map(p => `${p.getDescription().name} [${p.isEnabled() ? 'Enabled' : 'Disabled'}]`)
            .join(', ');

        return sender.sendMessage(`Плагины (${plugins.length}): ${list}`)
    }
}