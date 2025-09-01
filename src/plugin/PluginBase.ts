import type { Server } from "../Server.js";
import type { CommandSender } from "../command/CommandSender.js";
import Logger from "../utils/Logger.js";

export abstract class PluginBase {
    private logger: Logger;
    private server?: Server;
    private enabled: boolean = false;
    private description: any;

    constructor (server: Server, description: any) {
        this.server = server;
        this.logger = new Logger(description.name)
    }

    getLogger () : Logger {
        return this.logger;
    }

    getDescription () {
        return this.description;
    }

    abstract onEnable () : void | Promise<void>;
    abstract onDisable (): void | Promise<void>;

    onCommand?(sender: CommandSender, command: string, args: string[]): Promise<boolean> | boolean;

    setEnabled (boolean = true) : void {
        if (this.enabled !== boolean) {
            this.enabled = boolean;
            if (this.enabled === true) {
                this.onEnable();
            } else {
                this.onDisable();
            }
        }
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