"use strict";
var express = require('express');
var OrganizationService = require('../services/organization-service');
var router = express.Router();
var service = new OrganizationService();
router.get('/list', function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', function (req, res) {
    var User = req.query.rowid;
    service.get(User).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/create', function (req, res) {
    var request = req.body;
    console.log("at department router.post/create");
    service.create(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/update', function (req, res) {
    var request = req.body;
    service.update(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.delete('/delete', function (req, res) {
    var rowID = req.query.rowID;
    service.delete(rowID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/users/controllers/organization-controller.js.map
