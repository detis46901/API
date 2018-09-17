import LayerService = require('../services/layers-service');
import LayerPermissionService = require('../services/layers-permission-service')
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new LayerService();
var layerPermissionServce = new LayerPermissionService();

router.get('/list', token_auth, (req, res) => {

    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

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
    var request = <App.Layer>req.body;

    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    var request = <App.Layer>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', token_auth, (req, res) => {
    //if(req.body.layerPerm.delete) {
    var ID = <number>req.query.ID;

    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

    layerPermissionServce.deleteByLayer(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })

    // } else {
    //     res.status(500).json({
    //         message:"You do not have permission to delete this permission entry."
    //     })
    // }
});

export = router;