import mongoose from "mongoose";

async function connectDb() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDb;