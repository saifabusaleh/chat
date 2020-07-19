// src/app.ts
import config = require('./config');
import * as bodyParser from 'body-parser';
import * as cors from "cors";
import * as express from 'express';
import { createServer, Server } from 'http';
import { ioService } from './io';
import apiRouter from './routes/api.route';
import healthcheckRouter from './routes/healthcheck.route';
import logger = require('./utils/logger');

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

  get app(): express.Application {
    return this._app;
  }
}
