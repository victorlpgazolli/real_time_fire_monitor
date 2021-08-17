const WebSocket = require('ws');
const timeout = 30000;

module.exports = {
    broadcast({ wss, message }) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    },
    length({ wss, ws: client }) {
        const clients = Array.from(wss.clients)
        client.send("length:" + clients.length)
    },
    _ping: ({ wss }) => {
        function noop() { }

        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;
            ws.ping(noop);
        });
    },
    _parse_message({ message: rawMessage }) {
        if (!rawMessage) return {
            command: false,
            message: false,
        }
        const [command, message] = rawMessage.split("/");

        return {
            command,
            message
        }
    },
    _send_broadcast_message: ({ message }) => new Promise((resolve, reject) => {
        const ws = new WebSocket('wss://firemonitor.herokuapp.com:443');
        ws.on('open', function open() {
            ws.send('broadcast/' + message);
            ws.close();
        });
        ws.on('close', function close() {
            resolve("broadcast: ok!")
        });
        setTimeout(() => resolve("broadcast: timeout"), timeout)
    }),
    _get_clients_length: () => new Promise((resolve, reject) => {
        const ws = new WebSocket('wss://firemonitor.herokuapp.com:443');
        ws.on('open', function open() {
            ws.send('length');
        });
        ws.on('message', function message(data = "") {
            ws.send('length');
            ws.close();
            if (!data) return resolve(0)
            const [, length = 0] = data.split(":");
            resolve(+length - 1)
        });
        setTimeout(() => resolve(false), timeout)
    }),
}