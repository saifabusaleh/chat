import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import logger = require('../utils/logger');
const pkg = require('./../../package.json');
import * as sampleModel from '../models/sample.model';

export const healthcheck = (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        name: pkg.name, 
        version: pkg.version
    });  
}

export const healthcheckDb = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await sampleModel.getTimeModel();
        res.status(200).json(result.rows);
    } catch (error) {
        logger.error(`getTime error: ${error.message}`);
        res.status(500).json({status:'error', message: error.message, statusCode: 500});
    }
    
}
