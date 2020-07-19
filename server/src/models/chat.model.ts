
import { QueryResult } from 'pg';
import * as dbUtil from '../utils/dbUtil';

// Rooms
export const getRooms = async () => {
    return runQuery('SELECT room_id, name FROM ROOM;');
}

export const createRoom = async (name: string) => {
    return runQuery(`INSERT INTO public.room (name) VALUES ('${name}') RETURNING *;`);
}
// Messages

export const getMessages = async (roomId: number) => {
    return runQuery(`SELECT message_text, name, posted_datetime FROM MESSAGE INNER JOIN PERSON
     ON (message.person_id = person.person_id)  WHERE room_id=${roomId};`);
}

export const sendMessage = async (text: string, roomId: number, personId: number) => {
    return runQuery(`INSERT INTO public.message (message_text, posted_datetime, room_id, person_id)
    VALUES
        ('${text}', DEFAULT, ${roomId}, ${personId}) RETURNING *;`);
}

// Users

export const register = async (username: string) => {
    return runQuery(`INSERT INTO  PERSON(name) VALUES ('${username}') RETURNING *;`);
}

/// helpers
const runQuery = async (sqlQuery: string) => {
    let data: string[][] = [];
    let result: QueryResult;
    try {
        result = await dbUtil.sqlToDB(sqlQuery, data);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}