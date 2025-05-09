import express from 'express';
import {
    createNotification,
    getNotifications,
    deleteNotifications,
    updateNotification,
} from '../controllers/notiController.js';

const router = express.Router();

router.post('/create', createNotification);
router.get('/get', getNotifications);
router.delete('/delete', deleteNotifications);
router.put('/update', updateNotification);

export default router;