import express = require('express');
import LayerPermissionService = require('../services/layers-permission-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var router = express.Router();
var service = new LayerPermissionService();

router.get('/list', token_auth, (req, res) => {
    console.log(req.query.layerID)
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
    console.log(layerid) 
    service.getByLayer(layerid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbygroup', token_auth, (req, res) => {
    var groupid = <number>req.query.groupID;   
    service.getByGroup(groupid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/one', token_auth, (req, res) => {

    var LayerAdmin = <number>req.query.rowid;
    
    service.get(LayerAdmin).then((result) => {
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
    console.log (ID);
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