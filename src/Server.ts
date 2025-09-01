import { Telegraf, type Context } from "telegraf";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";

import type { CommandSender } from "./command/CommandSender.js";
import { CommandMap } from "./command/CommandMap.js";
import PluginManager from "./plugin/PluginManager.js";

export class Server {
    private bot: Telegraf<Context>;
    
    private commandMap = new CommandMap();
    private pluginsPath = path.join(process.cwd(), 'plugins');
    private configPath = path.join(process.cwd(), 'config.yml');

    public config: any = {};

    constructor (private token: string) {
        this.bot = new Telegraf(token);

        this.bot.on('text', async ctx => {
            const text = ctx.message.text;
            if (!text.startsWith('/')) return;

            const sender: CommandSender = {
                id: ctx.from.id,
                username: ctx.from.username,
                sendMessage: (msg: string) => ctx.reply(msg)
            };

            await this.commandMap.dispatch(sender, text);

            const [cmdName, ...args] = text.slice(1).split(/\s+/);
            for (const plugin of PluginManager.getPlugins()) {
                if (plugin.onCommand) {
                    const handled = await plugin.onCommand(sender, cmdName, args, this);
                    if (handled) break;
                }
            }
        })
    }

    private initFiles () {
        if (!fs.existsSync(this.pluginsPath)) fs.mkdirSync(this.pluginsPath);
        if (!fs.existsSync(this.configPath)) {
            const defaultConfig = {
                botToken: this.token
            };
            fs.writeFileSync(this.configPath, yaml.dump(defaultConfig));
            this.config = defaultConfig;
        } else {
            const data = fs.readFileSync(this.configPath, 'utf8');
            this.config = yaml.load(data);
        }
    }

    /**
     * @returns {CommandMap} 
     * 
     * @memberOf Server
     */
    getCommandMap () : CommandMap {
        return this.commandMap;
    }

    async start () {
        this.initFiles();
        await PluginManager.loadPlugins(this);
        await this.bot.launch();
        console.log('[Server]: Server started!');
    }
}