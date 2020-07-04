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

const corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
const cors = require('cors')
//create express app
const app: express.Express = express();
app.use(cors(corsOptions))
// app.options('*', cors());
app.use(bodyParser.json());
app.use('/healthcheck', healthcheckRouter);
app.use('/api', apiRouter);



app.listen(config.port, function () {
    logger.info(`server listening on port: ${config.port}`);
});

const server: Server = createServer(app);
const io: ioService = new ioService(server);
io.initalize();
