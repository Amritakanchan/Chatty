import express from 'express';

import protectRoute from '../middleware/auth.middleware.js';
import arcjetProtection from '../middleware/arcjet.middleware.js';
import { getAllContacts, getAllChats, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// the middleware executes in order, so that the requests et rate limited first, then authenticated.
router.use(arcjetProtection, protectRoute);

router.get('/contacts', getAllContacts);

router.get('/chats', getAllChats);

router.get('/:id', getMessagesByUserId);

router.post('/send/:id', sendMessage); // send messages to people using their login id

export default router;