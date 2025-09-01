import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";
import Logger from "../utils/Logger.js";

export abstract class PluginBase {
    private logger: Logger;
    private server: Server;
    private enabled: boolean = false;
    private description: any;

    constructor (description: any, server: Server) {
        this.server = server;
        this.description = description;
        this.logger = new Logger(description.name)
    }

    getLogger () : Logger {
        return this.logger;
    }

    getName () {
        return this.description.name;
    }

    getVersion () {
        return this.description.version;
    }

    abstract onEnable () : void | Promise<void>;
    abstract onDisable (): void | Promise<void>;

    onCommand?(sender: CommandSender, command: string, args: string[]): Promise<boolean> | boolean;

    registerEvents(listener: any, server: Server) {
        server.getPluginManager().registerEvents(listener, this);
    }

    setEnabled (boolean = true) : void {
        this.enabled = boolean;
    }

    isEnabled () : boolean {
        return this.enabled;
    }

    isDisabled () : boolean {
        return this.enabled === false;
    }

    getServer () : Server {
        return this.server;
    }
}