export interface JoinRoom {
    room: string;
    username: string;
}

export interface ClientToServerChatMessage {
    text: string,
    roomId: number,
    personId: number
}

export interface ServerToClientChatMessage {
    name: string,
    message_text: string
}