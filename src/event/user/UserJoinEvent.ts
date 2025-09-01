import type { CommandSender } from "../../command/CommandSender.js";
import { Event } from "../Event.js";

export class UserJoinEvent extends Event {
    public sender: CommandSender;

    constructor (sender: CommandSender) {
        super();
        this.sender = sender;
    }
}