import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);  // signup function would be defined in auth.controller.js

router.post('/login', login); // login function would be defined in auth.controller.js

router.post('/logout', logout); // logout function would be defined in auth.controller.js

export default router;