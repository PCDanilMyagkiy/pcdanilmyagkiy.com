import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const ipLimitingSchema = new mongoose.Schema(
    {
        ip: { type: String, unique: true },
        codesSent: { type: Number, default: 0 },

        createdAt: { type: Date, default: Date.now }
    },

    { collection: "ipLimiting" }
);

ipLimitingSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 }
);

const IpLimitingModel = db.model("IpLimiting", ipLimitingSchema, "ipLimiting");

export default IpLimitingModel;