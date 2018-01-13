"use strict";
var express = require('express');
var LayerPermissionService = require('../services/layers-permission-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var router = express.Router();
var service = new LayerPermissionService();
router.get('/list', token_auth, function (req, res) {
    console.log(req.query.layerID);
    service.getList(req.query.layerID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', token_auth, function (req, res) {
    var LayerAdmin = req.query.rowid;
    service.get(LayerAdmin).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/userlist', token_auth, function (req, res) {
    var userid = req.query.userid;
    service.getUserLayer(userid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/create', token_auth, function (req, res) {
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
    console.log(ID);
    service.delete(ID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/layers/controllers/layers-permission-controller.js.map
