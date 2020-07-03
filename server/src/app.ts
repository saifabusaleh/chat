// src/app.ts
import config = require('./config');
import * as express from 'express';
import * as bodyParser from 'body-parser';
import logger = require('./utils/logger');
//import controllers
import healthcheckRouter from './routes/healthcheck.route';
import apiRouter from './routes/api.route';

const cors = require('cors')

//create express app
const app: express.Express = express();
app.use(cors())

app.use(bodyParser.json());
app.use('/healthcheck', healthcheckRouter);
app.use('/api', apiRouter);



app.listen(config.port, function () {
    logger.info(`server listening on port: ${config.port}`);
});
