import CalculatorHistoriesModel from "./../models/calculatorHistoriesModel.js";



export function makeCalculatorHistoriesService() {
    return {
        async getCalculatorHistory(userId) {
            const calculatorHistory = await CalculatorHistoriesModel.findOne({ userId });

            return calculatorHistory;
        },

        async setHistory({ userId, history }) {
            await CalculatorHistoriesModel.findOneAndUpdate(
                { userId },
                { history },
                { upsert: true }
            );
            return { result: "History updated" }
        }
    }
}