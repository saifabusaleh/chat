import { Router } from 'express';
import * as apiController from '../controllers/api.controller';
const router = Router();
router.get('/rooms', apiController.getRooms);
router.post('/createRoom', apiController.createRoom);


router.get('/messsages', apiController.getMessages);
router.post('/sendMessage', apiController.sendMessage);

router.post('/register', apiController.register);


export default router;