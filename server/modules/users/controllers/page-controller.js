"use strict";
var express = require('express');
var PageService = require('../services/page-service');
var router = express.Router();
var service = new PageService();
router.get('/list', function (req, res) {
    service.getList(req.query.userID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getactivebyuserid', function (req, res) {
    service.getActiveByUserID(req.query.userID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/default', function (req, res) {
    service.getDefault(req.query.userID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', function (req, res) {
    var Page = req.query.rowid;
    service.get(Page).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/create', function (req, res) {
    var request = req.body;
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
    console.log(rowID);
    service.delete(rowID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/users/controllers/page-controller.js.map
