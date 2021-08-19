const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
    {
        socker_id: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("client", ClientSchema);
