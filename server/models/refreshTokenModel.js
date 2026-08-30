import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const refreshTokenSchema = new mongoose.Schema(
    {
        jti: { type: String, required: true, unique: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        expiresAt: { type: Date, required: true }
    },

    { collection: "refreshTokens" }
);

refreshTokenSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 60 * 5 }
);

const RefreshTokenModel = db.model("RefreshToken", refreshTokenSchema, "refreshTokens");

export default RefreshTokenModel;