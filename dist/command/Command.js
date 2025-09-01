export class Command {
    name;
    description;
    aliases;
    constructor(name, description = '', aliases = []) {
        this.name = name;
        this.description = description;
        this.aliases = aliases;
    }
}
//# sourceMappingURL=Command.js.map