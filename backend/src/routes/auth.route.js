import express from 'express';

import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';
import arcjetProtection from '../middleware/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection); // will be triggered whenever a route is called

// router.get('/test', (req, res)=> {
//     res.status(200).json({message:"Testing page"});
// })

router.post('/signup', signup);  // signup function would be defined in auth.controller.js

router.post('/login', login); // login function would be defined in auth.controller.js

router.post('/logout', logout); // logout function would be defined in auth.controller.js

router.put('/update-profile', protectRoute, updateProfile); // updateProfile function would be defined in auth.controller.js

router.get('/check-auth', protectRoute,  (req, res) => res.status(200).json(req.user)); // the only function of this route is to check if a user is authenticated in case the page is refreshed

export default router;