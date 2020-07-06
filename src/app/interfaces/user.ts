
export enum State {
    ONLINE = 'online',
    OFFLINE = 'offline',
    AWAY = 'away',
    BUSY = 'busy'
}
export interface User {
    nick: string;
    subnick?: string;
    state: State;
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
}