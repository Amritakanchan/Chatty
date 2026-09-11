import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'
import msgRoutes from './routes/message.route.js'
import connectDB from './lib/db.js'

import path from 'path'; // doubt
import { fileURLToPath } from 'url'; // doubt 

const __filename = fileURLToPath(import.meta.url); // doubt 
const __dirname = path.dirname(__filename);  // doubt

dotenv.config({ path: path.resolve(__dirname, '../.env') }); // doubt

const PORT = process.env.PORT || 3000; 
const app = express();

app.use(express.json()); // a middleware to parse incoming requests with JSON payloads

console.log('PORT =', PORT);

app.use('/api/auth', authRoutes);

app.use('/api/message', msgRoutes);

// making ready for deployment

if(process.env.NODE_ENV==='production'){
    
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    app.get(/(.*)/, (req, res)=> {
       res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    }) // For any route other than the above, send the index.html file from the frontend/dist folder
}

app.listen(PORT, () => {
    console.log("server started");
    connectDB();                      
});
