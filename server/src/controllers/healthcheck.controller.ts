import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import * as sampleModel from '../models/sample.model';
import logger = require('../utils/logger');
const pkg = require('./../../package.json');
const httpStatus = require('http-status')

export const healthcheck = (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        name: pkg.name,
        version: pkg.version
    });
}

export const healthcheckDb = async (req: Request, res: Response) => {
    let result: QueryResult;
    try {
        result = await sampleModel.getTimeModel();
        res.status(httpStatus.OK).json(result.rows);
    } catch (error) {
        logger.error(`getTime error: ${error.message}`);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: 'error', message: error.message, statusCode: httpStatus.INTERNAL_SERVER_ERROR });
    }

}
