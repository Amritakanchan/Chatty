import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import msgRoutes from './routes/message.route.js'

import path from 'path'; // doubt
import { fileURLToPath } from 'url'; // doubt

const __filename = fileURLToPath(import.meta.url); // doubt 
const __dirname = path.dirname(__filename);  // doubt

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // doubt

const PORT = process.env.PORT || 3000; 
const app = express();

console.log('PORT =', PORT);

app.use('/api/auth', authRoutes);

app.use('/api/message', msgRoutes);

app.listen(PORT, () => {
    console.log("server started");
})