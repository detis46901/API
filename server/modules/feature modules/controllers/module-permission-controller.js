"use strict";
var ModulePermissionService = require('../services/module-permission-service');
var GroupMemberService = require('../../users/services/group-member-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var express = require('express');
var router = express.Router();
var service = new ModulePermissionService();
var groupMemberService = new GroupMemberService();
router.get('/list', token_auth, function (req, res) {
    service.getList().then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/byuser', token_auth, function (req, res) {
    var userid = req.query.userid;
    service.getByUser(userid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/byinstance', token_auth, function (req, res) {
    var instanceid = req.query.instanceID;
    service.getByInstance(instanceid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/bygroup', token_auth, function (req, res) {
    var groupid = req.query.groupID;
    service.getByGroup(groupid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/byusergroups', token_auth, function (req, res) {
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

//# sourceMappingURL=../../../source-maps/modules/feature modules/controllers/module-permission-controller.js.map
