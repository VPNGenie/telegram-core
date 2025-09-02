import type { CommandSender } from "./command/CommandSender.js";
import type { Server } from "./Server.js";
export declare class User implements CommandSender {
    private id;
    private firstName;
    private lastName;
    private server;
    private username?;
    constructor(id: number, firstName: string, lastName: string, server: Server, username?: string | undefined);
    getId(): number;
    getUsername?(): string | undefined;
    getFirstName(): string;
    getLastName?(): string | undefined;
    getServer(): Server;
    sendMessage(message: string): void;
}
//# sourceMappingURL=User.d.ts.map