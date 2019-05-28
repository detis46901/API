import LayerPermissionService = require('../services/layers-permission-service');
import GroupMemberService = require('../../users/services/group-member-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import { GroupMemberInstance } from '../../users/models/group-member-model';
import { LayerPermissionInstance } from '../models/layers-permission-model';

var express = require('express');
var router = express.Router();
var service = new LayerPermissionService();
var groupMemberService = new GroupMemberService();

router.get('/list', token_auth, (req, res) => {
    service.getList().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbyuser', token_auth, (req, res) => {
    var userid = <number>req.query.userid;   
    service.getByUser(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbylayer', token_auth, (req, res) => {
    var layerid = <number>req.query.layerID;
    service.getByLayer(layerid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbygroup', token_auth, (req, res) => {
    var groupid = <number>req.query.groupID;
    console.log("groupid=" + groupid)
    service.getByGroup(groupid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbyusergroups', token_auth, (req, res) => {
    var finalResponse = new Array<any>();
    let groups = new Array<number>();
    groupMemberService.getByUser(req.query.userID).then((result) => {
        for (let i=0; i<result.length; i++) {
            let gg = new Array<number>()
            groups.push(result[i].groupID)
        }
        service.getByUserAndGroup(req.query.userID, groups).then((final) => {
            let lastLayerID: number
            final.sort((leftside, rightside): number => {
                if (leftside.layerID < rightside.layerID) return -1
                if (leftside.layerID > rightside.layerID) return 1
                return 0
            })
            let finalToSend: LayerPermissionInstance[] = []
            for (let j=0; j<final.length; j++) {
                //console.log(final[j].layerID)
                if (final[j].layerID != lastLayerID) {
                    lastLayerID = final[j].layerID
                    finalToSend.push(final[j])
                }
                else {
                    if (final[j].canGrant == true) {
                        finalToSend[finalToSend.length-1].canGrant = true
                    }
                    if (final[j].delete == true) {
                        finalToSend[finalToSend.length-1].delete = true
                    }
                    if (final[j].edit == true) {
                        finalToSend[finalToSend.length-1].edit = true
                    }
                }
            }
            res.send(finalToSend)
        })
    })
});

router.get('/one', token_auth, (req, res) => {

    var LayerID = <number>req.query.rowid;
    
    service.get(LayerID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/create', token_auth, (req, res) => {
    
    var request = <App.LayerPermission>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    
    var request = <App.LayerPermission>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', token_auth, (req, res) => {
    //if(req.body.delete) {
    var ID = <number>req.query.ID;
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    // } else {
    //     res.status(500).json({
    //         message:"You do not have permission to delete this permission entry."
    //     })
    // }
});


export = router;