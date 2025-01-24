import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGO_URI = "mongodb+srv://devimran733:KRHxG7Wk2uOIJnVA@cluster0.0wlcy.mongodb.net/"; // Direct MongoDB URI
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
