import { Telegraf, type Context } from "telegraf";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";

import type { CommandSender } from "./command/CommandSender.js";
import { CommandMap } from "./command/CommandMap.js";
import PluginManager from "./plugin/PluginManager.js";
import { UserJoinEvent } from "./event/user/UserJoinEvent.js";
import { TelegramAdapter } from "./TelegramAdapter.js";

export class Server {
    private bot: Telegraf<Context>;
    
    private commandMap = new CommandMap();
    private pluginsPath = path.join(process.cwd(), 'plugins');
    private configPath = path.join(process.cwd(), 'config.yml');

    public config: any = {};
    private telegram_adapters: TelegramAdapter;

    constructor (private token: string) {
        this.bot = new Telegraf(token);

        this.telegram_adapters = new TelegramAdapter(this.bot, this);

        this.bot.start(async ctx => {
            const sender: CommandSender = {
                getId : () => ctx.from.id,
                getUsername: () => ctx.from.username,
                getFirstName: () => ctx.from.first_name,
                getLastName: () => ctx.from.last_name,
                getServer: () => this,
                sendMessage: (msg: string) => ctx.reply(msg)
            };
            await this.getPluginManager().callEvent(new UserJoinEvent(sender));
        })

        this.bot.on('text', async ctx => {
            const text = ctx.message?.text;
            if (!text.startsWith('/')) return;

            const sender: CommandSender = {
                getId : () => ctx.from.id,
                getUsername: () => ctx.from.username,
                getFirstName: () => ctx.from.first_name,
                getLastName: () => ctx.from.last_name,
                getServer: () => this,
                sendMessage: (msg: string) => ctx.reply(msg)
            };

            const [cmd = '', ...args] = text.slice(1).split(/\s+/);

            for (const plugin of PluginManager.getPlugins()) {
                try {
                    if (plugin.onCommand) {
                        const handled = await plugin.onCommand(sender, cmd, args);
                        if (handled) break;
                    }
                } catch (e) {
                    plugin.getLogger().error(`Ошибка onCommand ${e}`)
                }
            }

            await this.commandMap.dispatch(sender, cmd, args);
        });
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

    getPluginManager (): typeof PluginManager {
        return PluginManager;
    }

    async start () {
        console.log('[Server] Starting...')
        this.initFiles();
        await PluginManager.loadPlugins(this);
        await this.bot.launch();
        console.log('[Server]: Server Started!');
    }

    async stop () {
        console.log('[Server] Stopping...');
        await PluginManager.disableAll();
        process.exit(0);
    }
}