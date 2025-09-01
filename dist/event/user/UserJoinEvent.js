import { Event } from "../Event.js";
export class UserJoinEvent extends Event {
    sender;
    constructor(sender) {
        super();
        this.sender = sender;
    }
}
//# sourceMappingURL=UserJoinEvent.js.map