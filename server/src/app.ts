// src/app.ts
import config = require('./config');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import logger = require('./utils/logger');
//import controllers
import healthcheckRouter from './routes/healthcheck.route';
import apiRouter from './routes/api.route';
import {ioService } from './io';
import { createServer, Server } from 'http';
import * as cors from "cors";

//create express app
const app: express.Express = express();
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }))
app.use(bodyParser.json());
app.use('/healthcheck', healthcheckRouter);
app.use('/api', apiRouter);

const server: Server = createServer(app);

const io: ioService = new ioService(server);
io.initalize();


server.listen(config.port, function () {
    logger.info(`server listening on port: ${config.port}`);
});

