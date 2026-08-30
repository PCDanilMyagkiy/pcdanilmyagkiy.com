import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const ipBlacklistSchema = new mongoose.Schema(
    {
        ip: { type: String, unique: true },
    },

    { collection: "ipBlacklist" }
);

const IpBlacklistModel = db.model("IpBlacklist", ipBlacklistSchema, "ipBlacklist");

export default IpBlacklistModel;