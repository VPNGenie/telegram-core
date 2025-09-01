export interface CommandSender {
    id: number,
    username?: string | undefined,
    sendMessage (message: string): void;
}