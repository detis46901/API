"use strict";
var express = require('express');
var LayerPermissionService = require('../services/layers-permission-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var router = express.Router();
var service = new LayerPermissionService();
router.get('/list', token_auth, function (req, res) {
    console.log(req.query.layerID);
    service.getList().then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbyuser', token_auth, function (req, res) {
    var userid = req.query.userid;
    service.getByUser(userid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbylayer', token_auth, function (req, res) {
    var layerid = req.query.layerID;
    console.log(layerid);
    service.getByLayer(layerid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbygroup', token_auth, function (req, res) {
    var groupid = req.query.groupID;
    service.getByGroup(groupid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', token_auth, function (req, res) {
    var LayerID = req.query.rowid;
    service.get(LayerID).then(function (result) {
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
    //if(req.body.delete) {
    var ID = req.query.ID;
    console.log(ID);
    service.delete(ID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
    // } else {
    //     res.status(500).json({
    //         message:"You do not have permission to delete this permission entry."
    //     })
    // }
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/layers/controllers/layers-permission-controller.js.map
