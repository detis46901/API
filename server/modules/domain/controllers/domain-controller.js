"use strict";
var domainService = require('../services/domain-service');
var DomainModel = require('../models/domain-model');
var stream = require('stream');
var express = require('express');
var router = express.Router();
var service = new domainService();
router.get('/test', function (req, res) {
    console.log('testing');
    DomainModel.Model.findAll().then();
    res.send('Test Passed');
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/domain/controllers/domain-controller.js.map
