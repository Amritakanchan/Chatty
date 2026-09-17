import express from 'express';
import authRoutes from './routes/auth.route.js'
import msgRoutes from './routes/message.route.js'
import connectDB from './lib/db.js'
import ENV from './lib/env.js'; // storing all env values in env.js file to use it as an obejct

import path from 'path';

const __dirname = path.resolve();  

const PORT = ENV.PORT; 
const app = express();

app.use(express.json()); // a middleware to parse incoming requests with JSON payloads

console.log('PORT =', PORT);

app.use('/api/auth', authRoutes);

app.use('/api/message', msgRoutes);

// making ready for deployment
if(ENV.NODE_ENV==='production'){
    
    app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
    console.log(path.resolve(__dirname, "../frontend/dist"));

    app.get(/(.*)/, (req, res)=> {
       res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    }) // For any route other than the above, send the index.html file from the frontend/dist folder
}

app.listen(PORT, () => {
    console.log("server started");
    connectDB();                      
});