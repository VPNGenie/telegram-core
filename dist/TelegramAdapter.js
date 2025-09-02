import { Server } from "./Server.js";
import { UserJoinEvent } from "./event/index.js";
export function createTelegramSender(ctx, server) {
    return {
        getId: () => ctx.from.id,
        getUsername: () => ctx.from.username,
        getFirstName: () => ctx.from.first_name,
        getLastName: () => ctx.from.last_name,
        getServer: () => server,
        sendMessage: (msg) => ctx.reply(msg)
    };
}
export class TelegramAdapter {
    bot;
    server;
    constructor(bot, server) {
        this.bot = bot;
        this.server = server;
        this.bot = bot;
        this.server = server;
        this.registerEvents();
    }
    registerEvents() {
        this.getAdapter().start(async (ctx) => {
            await this.server.getPluginManager().callEvent(new UserJoinEvent(createTelegramSender(ctx, this.server)));
        });
    }
    getAdapter() {
        return this.bot;
    }
}
//# sourceMappingURL=TelegramAdapter.js.map