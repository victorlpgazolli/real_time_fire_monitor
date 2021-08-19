
const express = require('express');
const ReportsController = require('./controllers/ReportsController');

const routes = express.Router();


routes.get('/', ReportsController.homePage);
routes.post('/report/', ReportsController.saveReport);
routes.get('/report/list', ReportsController.getReportsHistory);
routes.get('/config/port', (req, res) => {
    console.log("requested port:" + process.env.PORT);
    res.json({
        port: process.env.PORT
    })
});
routes.get('/config/wakeup', (req, res) => {
    console.log("not today!");
    res.json({
        ok: new Date().getTime()
    })
});


module.exports = routes;