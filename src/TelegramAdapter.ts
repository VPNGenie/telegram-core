import type { Context, Telegraf } from "telegraf";
import { Server } from "./Server.js";
import type { CommandSender } from "./command/CommandSender.js";
import { UserJoinEvent } from "./event/index.js";

export function createTelegramSender (ctx: any, server: Server): CommandSender {
    return {
        getId : () => ctx.from.id,
        getUsername: () => ctx.from.username,
        getFirstName: () => ctx.from.first_name,
        getLastName: () => ctx.from.last_name,
        getServer: () => server,
        sendMessage: (msg: string) => ctx.reply(msg)
    };
}

export class TelegramAdapter {
    constructor (
        private bot: Telegraf<Context>,
        private server: Server
    ) {
        this.bot = bot;
        this.server = server;

        this.registerEvents();
    }

    private registerEvents () {
        this.getAdapter().start(async ctx => {
            await this.server.getPluginManager().callEvent(new UserJoinEvent(
                createTelegramSender(ctx, this.server)
            ));
        })
    }

    private getAdapter () {
        return this.bot;
    }
}