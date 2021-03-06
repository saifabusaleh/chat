import { Router } from 'express';
import * as apiController from '../controllers/api.controller';
const router = Router();
router.get('/rooms', apiController.getRooms);
router.post('/createRoom', apiController.createRoom);
router.get('/messages', apiController.getMessages);
router.post('/register', apiController.register);


export default router;