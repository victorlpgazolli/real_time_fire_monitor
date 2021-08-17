const { Schema, model } = require("mongoose");

const ReportsSchema = new Schema(
    {
        carbon: {
            type: Number
        },
        moisture: {
            type: Number
        },
        temperture: {
            type: Number
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("report", ReportsSchema);
