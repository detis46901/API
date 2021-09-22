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
router.get('/byuser', token_auth, function (req, res) {
    var userid = req.query.userid;
    service.getByUser(userid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/bylayer', token_auth, function (req, res) {
    var layerid = req.query.layerID;
    service.getByLayer(layerid).then(function (result) {
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
    var groups = new Array();
    groupMemberService.getByUser(req.query.userID).then(function (result) {
        for (var i = 0; i < result.length; i++) {
            var gg = new Array();
            groups.push(result[i].groupID);
        }
        service.getByUserAndGroup(req.query.userID, groups).then(function (final) {
            var lastLayerID;
            final.sort(function (leftside, rightside) {
                if (leftside.layerID < rightside.layerID)
                    return -1;
                if (leftside.layerID > rightside.layerID)
                    return 1;
                return 0;
            });
            var finalToSend = [];
            console.log(final)
            for (var j = 0; j < final.length; j++) {
                if (final[j].layerID != lastLayerID) {
                    lastLayerID = final[j].layerID;
                    finalToSend.push(final[j]);
                }
                else {
                    if (final[j].canGrant == true) {
                        finalToSend[finalToSend.length - 1].canGrant = true;
                    }
                    if (final[j].delete == true) {
                        finalToSend[finalToSend.length - 1].delete = true;
                    }
                    if (final[j].edit == true) {
                        finalToSend[finalToSend.length - 1].edit = true;
                    }
                }
            }
            res.send(finalToSend);
        });
    });
});
router.get('/single', token_auth, function (req, res) {
    var LayerID = req.query.rowid;
    service.get(LayerID).then(function (result) {
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

//# sourceMappingURL=../../../source-maps/modules/layers/controllers/layers-permission-controller.js.map
