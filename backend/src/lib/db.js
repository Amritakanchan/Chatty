import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1); // 1 status code indicates failure, 0 indicates success
    }
}

export default connectDB;