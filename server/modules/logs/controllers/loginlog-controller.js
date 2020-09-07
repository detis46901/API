"use strict";
var LoginLogService = require('../services/loginlog-service');
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();
var service = new LoginLogService();
router.get('/test', function (req, res) {
    res.send('Test Passed');
});
router.post('/single', function (req, res) {
    var request = req.body;
    service.create(request)
        .then(function (result) {
        res.status(201).json({
            message: "Login Log created."
        });
    }).catch(function (err) {
        res.status(500).json({
            error: err,
            message: "Login Log could not be created. Check email to ensure it is in the correct format."
        });
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/logs/controllers/loginlog-controller.js.map
