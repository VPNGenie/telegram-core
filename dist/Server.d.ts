import { CommandMap } from "./command/CommandMap.js";
export declare class Server {
    private token;
    private bot;
    private commandMap;
    private pluginsPath;
    private configPath;
    config: any;
    constructor(token: string);
    private initFiles;
    /**
     * @returns {CommandMap}
     *
     * @memberOf Server
     */
    getCommandMap(): CommandMap;
    start(): Promise<void>;
}
//# sourceMappingURL=Server.d.ts.map