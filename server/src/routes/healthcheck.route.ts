import { Router } from 'express';
import * as healthcheckController from '../controllers/healthcheck.controller';

const router = Router();
router.get('/', healthcheckController.healthcheck);
router.get('/db', healthcheckController.healthcheckDb);

export default router;