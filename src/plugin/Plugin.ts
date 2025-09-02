import type { Server } from "../Server.js";
import type Logger from "../utils/Logger.js";

export interface Plugin {
    onEnable(): void,
    onDisable(): void,
    isEnabled(): boolean,
    getDescription(): string,
    getLogger(): Logger,
    getServer(): Server,
    getName(): string
}