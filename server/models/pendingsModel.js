import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const pendingsSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        verificationCodeHash: { type: String },
        codeSentAt: { type: Number },
        attempts: { type: Number },

        createdAt: { type: Date, default: Date.now }
    },

    { collection: "pendings" }
);

pendingsSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 5 }
);

const PendingsModel = db.model("Pendings", pendingsSchema, "pendings");

export default PendingsModel;