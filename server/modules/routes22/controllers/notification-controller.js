"use strict";
var NotificationService = require('../services/notification-service');
var token_auth = require('../../JWT_Checker/loginToken');
var express = require('express');
var router = express.Router();
var service = new NotificationService();
router.get('/list', token_auth, function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/byuser', token_auth, function (req, res) {
    var userID = req.query.userID;
    service.getByUser(userID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/bytype', token_auth, function (req, res) {
    var type = req.query.objectType;
    service.getByType(type).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/bysource', token_auth, function (req, res) {
    var sourceID = req.query.sourceID;
    service.getBySource(sourceID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/single', token_auth, function (req, res) {
    var notif = req.query.rowid;
    service.get(notif).then(function (result) {
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
    var ID = req.query.ID;
    service.delete(ID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/routes22/controllers/notification-controller.js.map
