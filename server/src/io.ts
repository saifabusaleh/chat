
import * as socketIo from 'socket.io';
import Users, { User } from './users';
import logger = require('./utils/logger');

export enum ChatEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message'
}

export interface Message {
    room: string;
    name: string;
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
            console.log('Connected client');

            //   socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
            //     console.log('[server](message): %s', JSON.stringify(m));
            //     this.io.emit('message', m);
            //   });

            socket.on('sendMessage', (text: any) => {
                const user = this.users.getUser(socket.id);
                if(user) {
                    logger.info(`got message: ${text} from user: ${user.name}`)
                    this.io.to(user.room).emit('message', { name: user.name, message_text: text });
                }
                // callback();
            });

            socket.on('join', (m: any) => {
                const name = m.name;
                const room = m.room;
                const user: User = this.users.addUser({ id: socket.id, name, room });

                socket.join(user.room);
                logger.info(`user ${m.name} joined room ${m.room}`)

                // console.log('user: ', m.name, ' joined room: ' + m.room);
                this.io.to(user.room).emit('roomData', { room: user.room, users: this.users.getUsersInRoom(user.room) });

            });

            socket.on(ChatEvent.DISCONNECT, () => {
                console.log('Client disconnected');
            });
        });
    }
}