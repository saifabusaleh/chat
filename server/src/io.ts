import * as chatModel from './models/chat.model';
import * as socketIo from 'socket.io';
import Users, { User } from './users';
import logger = require('./utils/logger');
import { QueryResult } from 'pg';

export enum ChatEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message',
    SEND_MESSAGE = 'sendMessage',
    JOIN_ROOM = 'join_room'
}

export interface JoinRoom {
    room: string;
    username: string;
}

export interface ChatMessage {
    text: string,
    roomId: number,
    personId: number 
}
export class ioService {

    private io: any;
    private users: Users;
    constructor(server: any) {
        this.io = socketIo(server, { origins: '*:*' });
        this.users = new Users();
    }

    public initalize(): void {
        this.io.on(ChatEvent.CONNECT, (socket: any) => {
            logger.info('Connected client');


            socket.on(ChatEvent.SEND_MESSAGE, async (message: ChatMessage) => {
                const user = this.users.getUser(socket.id);
                if(user) {
                    logger.info(`got message: ${message.text} from user: ${user.name} room_id: ${message.roomId} personId: ${message.personId}`);
                    let result : QueryResult = await chatModel.sendMessage(message.text, message.roomId, message.personId);
                    console.log('res: ' + result.rows.length);
                    if(result.rows && result.rows.length) {
                        this.io.to(user.room).emit(ChatEvent.MESSAGE, { name: user.name, message_text: message.text });
                    }
                }
                // callback();
            });

            socket.on(ChatEvent.JOIN_ROOM, (m: JoinRoom) => {
                const name = m.username;
                const roomName = m.room;
                const user: User = this.users.addUser({ id: socket.id, name, room: roomName });

                socket.join(user.room);
                logger.info(`user ${m.username} joined room ${m.room}`)

                this.io.to(user.room).emit('roomData', { room: user.room, users: this.users.getUsersInRoom(user.room) });

            });

            socket.on(ChatEvent.DISCONNECT, () => {
                logger.info('Client disconnected')
            });
        });
    }
}