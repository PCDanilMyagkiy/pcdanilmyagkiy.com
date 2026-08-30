import mongoose from "mongoose";

const db = mongoose.connection.useDb("pcd");



const calculatorHistoriesSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        history: { type: Array, required: true }
    },

    { collection: "calculatorHistories" }
);

const CalculatorHistoriesModel = db.model("CalculatorHistory", calculatorHistoriesSchema, "calculatorHistories");

export default CalculatorHistoriesModel;