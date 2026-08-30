import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const trafficLimitingSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        codesSent: { type: Number, default: 0 },

        createdAt: { type: Date, default: Date.now() }
    },

    { collection: "trafficLimiting" }
);

trafficLimitingSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 }
);

const TrafficLimitingModel = db.model("TrafficLimiting", trafficLimitingSchema, "trafficLimiting");

export default TrafficLimitingModel;