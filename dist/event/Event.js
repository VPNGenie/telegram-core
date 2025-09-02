export class Event {
    cancelled = false;
    isCancelled() {
        return this.cancelled === true;
    }
    setCancelled(value) {
        this.cancelled = value;
    }
}
//# sourceMappingURL=Event.js.map