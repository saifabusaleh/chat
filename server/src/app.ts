// src/app.ts
import config = require('./config');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import logger = require('./utils/logger');
//import controllers
import healthcheckRouter from './routes/healthcheck.route';
import apiRouter from './routes/api.route';
import { ioService } from './io';
import { createServer, Server } from 'http';
import * as cors from "cors";

export class ChatServer {
  private _app: express.Express;
  constructor() {
    this._app = express();
    this._app.use(cors())
    this._app.use(bodyParser.json());
    this._app.use('/healthcheck', healthcheckRouter);
    this._app.use('/api', apiRouter);
    const server: Server = createServer(this._app);

    const io: ioService = new ioService(server);
    io.initalize();


    server.listen(config.port, function () {
      logger.info(`server listening on port: ${config.port}`);
    });

  }

  get app (): express.Application {
    return this._app;
  }
}
