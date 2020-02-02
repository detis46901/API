import ModulePermissionService = require('../services/module-permission-service');
import GroupMemberService = require('../../users/services/group-member-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import { GroupMemberInstance } from '../../users/models/group-member-model';

var express = require('express');
var router = express.Router();
var service = new ModulePermissionService();
var groupMemberService = new GroupMemberService();

router.get('/list', token_auth, (req, res) => {
    service.getList().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/byuser', token_auth, (req, res) => {
    var userid = <number>req.query.userid;   
    service.getByUser(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/byinstance', token_auth, (req, res) => {
    var instanceid = <number>req.query.instanceID;
    service.getByInstance(instanceid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/bygroup', token_auth, (req, res) => {
    var groupid = <number>req.query.groupID;
    //console.log("groupid=" + groupid)
    service.getByGroup(groupid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/byusergroups', token_auth, (req, res) => {
    var finalResponse = new Array<any>();
    let groups = new Array<number>();
    groupMemberService.getByUser(req.query.userID).then((result) => {
        for (let i=0; i<result.length; i++) {
            let gg = new Array<number>()
            groups.push(result[i].groupID)
        }
        service.getByUserAndGroup(req.query.userID, groups).then((final) => {
            res.send(final)
        })
    })
});

router.post('/single', token_auth, (req, res) => {
    
    var request = <App.ModulePermission>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    
    var request = <App.ModulePermission>req.body;

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