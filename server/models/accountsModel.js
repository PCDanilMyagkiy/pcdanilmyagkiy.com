import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const accountsSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String },
    },

    { collection: "accounts" }
);

const AccountsModel = db.model("Accounts", accountsSchema, "accounts");

export default AccountsModel;