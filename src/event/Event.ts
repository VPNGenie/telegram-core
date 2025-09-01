export abstract class Event {
    private cancelled: boolean = false;

    isCancelled () : boolean {
        return this.cancelled;
    }

    setCancelled (boolean: boolean) {
        this.cancelled = boolean;
    }
}