"use strict";
var express = require('express');
var GroupService = require('../services/group-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var router = express.Router();
var service = new GroupService();
//how to inherit from parent controller
router.get('/list', token_auth, function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/single', token_auth, function (req, res) {
    var User = req.query.rowid;
    service.get(User).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/single', token_auth, function (req, res) {
    var request = req.body;
    service.create(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/update', token_auth, function (req, res) {
    var request = req.body;
    service.update(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.delete('/delete', token_auth, function (req, res) {
    var rowID = req.query.ID;
    service.delete(rowID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/routes22/controllers/group-controller.js.map
