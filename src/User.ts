import type { CommandSender } from "./command/CommandSender.js";
import type { Server } from "./Server.js";

export class User implements CommandSender {
    constructor (
        private id: number,
        private firstName: string,
        private lastName: string,
        private server: Server,
        private username?: string
    ) {}

    getId(): number {
        return this.id;
    }
    
    getUsername?(): string | undefined {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName?(): string | undefined {
        return this.lastName;
    }

    getServer(): Server {
        return this.server;
    }

    sendMessage(message: string): void {
        throw new Error("Method not implemented.");
    }
}