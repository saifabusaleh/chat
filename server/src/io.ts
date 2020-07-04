import * as chatModel from './models/chat.model';
import * as socketIo from 'socket.io';
import Users, { User } from './users';
import logger = require('./utils/logger');
import { QueryResult } from 'pg';
import { ChatEvent } from './enums';
import { ClientToServerChatMessage, ServerToClientChatMessage, JoinRoom } from './types';

export class ioService {

    private io: any;
    private users: Users;
    constructor(server: any) {
        this.io = socketIo(server);
        this.users = new Users();
    }

    public initalize(): void {
        this.io.on(ChatEvent.CONNECT, (socket: any) => {
            logger.info('Connected client');


            socket.on(ChatEvent.SEND_MESSAGE, async (message: ClientToServerChatMessage) => {
                const user = this.users.getUser(socket.id);
                if (user) {
                    logger.info(`got message: ${message.text} from user: ${user.name} room_id: ${message.roomId} personId: ${message.personId}`);
                    let result: QueryResult = await chatModel.sendMessage(message.text, message.roomId, message.personId);
                    if (result.rows && result.rows.length) {
                        const toClientMsg: ServerToClientChatMessage = { name: user.name, message_text: message.text };
                        this.io.to(user.room).emit(ChatEvent.MESSAGE, toClientMsg);
                    }
                }
                // callback();
            });

            socket.on(ChatEvent.JOIN_ROOM, (joinedRoom: JoinRoom) => {
                const username = joinedRoom.username;
                const roomName = joinedRoom.room;
                const user: User = this.users.addUser({ id: socket.id, name: username, room: roomName });

                if (user) {
                    const toClientMsg: ServerToClientChatMessage = { name: 'admin', message_text: `${user.name}, welcome to room ${user.room}.` };

                    socket.emit(ChatEvent.MESSAGE, toClientMsg);
                    socket.join(user.room);
                    logger.info(`user ${joinedRoom.username} joined room ${joinedRoom.room}`)
                    this.io.to(user.room).emit('roomData', { room: user.room, users: this.users.getUsersInRoom(user.room) });
                }

            });

            socket.on(ChatEvent.DISCONNECT, () => {
                logger.info('Client disconnected');
                const user = this.users.getUser(socket.id);

                if (user) {
                    const toClientMsg: ServerToClientChatMessage = { name: 'admin', message_text: `${user.name} has left.` };
                    this.io.to(user.room).emit('message', toClientMsg);
                    this.io.to(user.room).emit('roomData', { room: user.room, users: this.users.getUsersInRoom(user.room) });
                }
            });
        });
    }
}