const report = require('../models/report')
const path = require('path');

const {
    _send_broadcast_message: sendBroadcast,
    _get_clients_length: getClientsConnected
} = require('./ClientsController');

const INDEX = path.join(__dirname, '../../app/public/index.html');

module.exports = {
    async saveReport(req, res) {
        const {
            carbon,
            moisture,
            temperture,
        } = req.body;

        try {
            const payload = { carbon, moisture, temperture };

            const response = await report.create(payload);

            res.json(response);

            const message = Object.entries(payload).map(item => [item.shift(), item.pop()].join(":"))

            sendBroadcast({ message }).then(console.log)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error });
        }
    },

    async getReportsHistory(req, res) {
        try {
            const history = await report.find();

            return res.json({
                history,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });

        }
    },

    homePage(req, res) {
        res.sendFile(INDEX)
    }
}