import logger = require('./utils/logger');

export interface User {
    id: number,
    name: string
    room: string
};

// export interface Error {
//     error: string
// }

class Users {
    private users: Array<User> = [];

    public addUser = (user: User): User  => {
        let name = user.name.trim().toLowerCase();
        let room = user.room.trim().toLowerCase();
        let id = user.id;
        const existingUser = this.users.find((user) => user.room === room && user.name === name);

        if (!name || !room) {
            logger.info('Username and room are required.');
          //  throw new Error('Username and room are required.')
        }
        if (existingUser) {
            logger.info('Username:' + existingUser.name + ' is taken.');
            // throw new Error('Username is taken.')
        } 

        const newUser: User = { id, name, room };

        this.users.push(newUser);

        return newUser;
    }

    public removeUser = (id: number): User  => {
        const index = this.users.findIndex((user) => user.id === id);
        if(index === -1) {
            throw new Error('user is not defined');
        }
        return this.users.splice(index, 1)[0];
    }

    public getUser = (id: number) => this.users.find((user) => user.id === id);

    public getUsersInRoom = (room: string) => this.users.filter((user) => user.room === room);


}

export default Users;