export abstract class Event {
    private cancelled: boolean = false;

    isCancelled () : boolean {
        return this.cancelled === true;
    }

    setCancelled (value: boolean) {
        this.cancelled = value;
    }
}