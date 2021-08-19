const defaultPayload = ["moisture", "temperture", "carbon"]
module.exports.mqttParser = ({ payload_raw }) => {

    if (!Buffer.isBuffer(payload_raw)) return false;

    const payload = payload_raw.toString()

    if (!payload) return false;

    const parsedData = payload.split(",");

    const hasData = Array.isArray(parsedData) && parsedData.length === defaultPayload.length;

    if (!hasData) return false;

    const [moisture, temperture, carbon] = parsedData.map(data => +data);
    return {
        moisture,
        temperture,
        carbon
    }
}