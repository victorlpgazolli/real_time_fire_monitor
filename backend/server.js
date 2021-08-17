const express = require('express');
const app = express();

require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');
process.env.PORT = process.env.PORT || 3333
const PORT = process.env.PORT;

const { data: TheThingsNetwork } = require("ttn")

const URL = process.env.NODE_ENV === 'production' ? "https://firemonitor.herokuapp.com" : "http://localhost:3333";

const whitelist = [
    "https://firemonitor.herokuapp.com",
    "http://localhost:3333",
    "http://localhost:3000",
    "https://monitoramentodeincendios.vercel.app",
    "https://monitoramentodeincendios.ga",
    "https://fire-monitor-frontend-git-master-victorlpgazolli.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            return callback(null, true)
        }
        console.log({ origin });
        callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

const server = require('http').createServer(app);
const { Server } = require('ws');

const {
    _parse_message: parseMessage,
    _ping: ping,
    broadcast,
    length,
} = require('./src/controllers/ClientsController');
const wakeUp = require('./src/utils/wakeup');

const { mqttParser: parseMqttPayload } = require('./src/utils/mqttParser');

const { default: axios } = require('axios');

const wss = new Server({ server });

const api = axios.create({
    baseURL: URL
})

if (process.env.MONGOOSE_USER) mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.PASSWORD}@firemonitor.ebwbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});

const appID = process.env.APP_ID;
const devId = process.env.DEV_ID
const accessKey = process.env.ACCESS_KEY;

wss.on('connection', function connection(ws, req) {
    ws.isAlive = true;

    ws.on('pong', function heartbeat() {
        this.isAlive = true;
        console.log("pong");
    });

    ws.on("message", (data = "") => {
        const actionPerMessage = {
            broadcast: message => broadcast({ wss, ws, message }),
            length: message => length({ wss, ws, message }),
        }
        const { command, message } = parseMessage({ message: data })

        const action = actionPerMessage[command];

        if (!action) return;

        action(message)
    })
});

const interval = setInterval(() => ping({ wss }), 15000);

wss.on('error', console.error);
wss.on('close', () => clearInterval(interval));

TheThingsNetwork(appID, accessKey)
    .then(function (client) {
        client.on("connect", _ => console.log("connected!"));
        client.on("error", console.error);

        client.on("uplink", function (_, payload) {
            const parsedPayload = parseMqttPayload(payload);

            const { dev_id } = payload;

            const isFromSameDevice = devId === dev_id;

            const ignoreUplink = !isFromSameDevice || !parsedPayload;

            if (ignoreUplink) return parsedPayload;

            const {
                carbon,
                moisture,
                temperture
            } = parsedPayload;

            api.post("/report/", {
                carbon,
                moisture,
                temperture
            })
        })
    })
    .catch(function (err) {
        console.error(err)
    })


server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    wakeUp(URL + "/config/wakeup", 0.5)
});

