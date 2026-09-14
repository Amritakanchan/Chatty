import mongoose from "mongoose";
import ENV from './env.js'; // importing env object from env.js file

const connectDB = async() => {
    try {
        const { MONGO_URI } = ENV; // destructuring MONGO_URI from ENV object
        if(!MONGO_URI) throw new Error ("MONGO_URI is not set");

        await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1); // 1 status code indicates failure, 0 indicates success
    }
}

export default connectDB;