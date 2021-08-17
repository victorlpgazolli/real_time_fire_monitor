const fetch = require('node-fetch');

const wakeUp = (url, interval = 25) => {
    const milliseconds = interval * 60000;
    console.log(`scheduled request: ${interval}minutes`);

    setTimeout(() => {
        try {
            console.log(`Making HTTP request to ${url}...`)
            fetch(url);
        }
        catch (err) {
            console.log(`Error ${err} fetching ${url}`);
        }
        finally {
            wakeUp(url);
        }

    }, milliseconds);
};

module.exports = wakeUp;