"use strict";
var LayerPermissionService = require('../services/layers-permission-service');
var GroupMemberService = require('../../users/services/group-member-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var express = require('express');
var router = express.Router();
var service = new LayerPermissionService();
var groupMemberService = new GroupMemberService();
router.get('/list', token_auth, function (req, res) {
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
    service.getByLayer(layerid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbygroup', token_auth, function (req, res) {
    var groupid = req.query.groupID;
    console.log("groupid=" + groupid);
    service.getByGroup(groupid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbyusergroups', token_auth, function (req, res) {
    var finalResponse = new Array();
    var groups = new Array();
    groupMemberService.getByUser(req.query.userID).then(function (result) {
        for (var i = 0; i < result.length; i++) {
            var gg = new Array();
            groups.push(result[i].groupID);
        }
        service.getByUserAndGroup(req.query.userID, groups).then(function (final) {
            res.send(final);
        });
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
