import { Request, Response } from 'express';
import * as chatModel from '../models/chat.model';
import { QueryResult } from 'pg';
import logger = require('../utils/logger');
const httpStatus = require('http-status')

// Rooms
export const getRooms = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await chatModel.getRooms();
        res.status(httpStatus.OK).json(result.rows);
    } catch (error) {
        logger.error(`getRooms error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:'error', message: error.message, statusCode: 500});
    }
}

export const createRoom = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await chatModel.createRoom(req.body.roomName);
        res.status(httpStatus.CREATED).json(result.rows);
    } catch (error) {
        logger.error(`createRoom error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:'error', message: error.message, statusCode: 500});
    }
}


// Messages
export const getMessages = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await chatModel.getMessages(req.query.roomId);
        res.status(httpStatus.OK).json(result.rows);
    } catch (error) {
        logger.error(`getMessages error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:'error', message: error.message, statusCode: 500});
    }
}

export const sendMessage = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await chatModel.sendMessage(req.body.text, req.body.roomId, req.body.personId);
        res.status(httpStatus.OK).json(result.rows);
    } catch (error) {
        logger.error(`sendMessage error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:'error', message: error.message, statusCode: 500});
    }
}

//User

export const register = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await chatModel.register(req.body.username);
        res.status(httpStatus.CREATED).json(result.rows);
    } catch (error) {
        logger.error(`register error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({status:'error', message: error.message, statusCode: 500});
    }
}