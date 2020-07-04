
import * as socketIo from 'socket.io';

export enum ChatEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message'
  }


export class ioService {

    private io: any;
    constructor(server: any) {
        this.io = socketIo(server);
        this.io.origins(['localhost:4200']);
    }

    public initalize (): void {
        this.io.on(ChatEvent.CONNECT, (socket: any) => {
          console.log('Connected client');
    
        //   socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
        //     console.log('[server](message): %s', JSON.stringify(m));
        //     this.io.emit('message', m);
        //   });
    
          socket.on(ChatEvent.DISCONNECT, () => {
            console.log('Client disconnected');
          });
        });
      }
}