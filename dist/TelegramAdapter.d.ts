import type { Context, Telegraf } from "telegraf";
import { Server } from "./Server.js";
import type { CommandSender } from "./command/CommandSender.js";
export declare function createTelegramSender(ctx: any, server: Server): CommandSender;
export declare class TelegramAdapter {
    private bot;
    private server;
    constructor(bot: Telegraf<Context>, server: Server);
    private registerEvents;
    private getAdapter;
}
//# sourceMappingURL=TelegramAdapter.d.ts.map