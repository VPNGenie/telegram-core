import type { Server } from "../Server.js";

export interface CommandSender {
    getId(): number,
    getUsername?(): string | undefined,
    getFirstName(): string,
    getLastName?(): string | undefined
    getServer(): Server,
    sendMessage (message: string): void;
}