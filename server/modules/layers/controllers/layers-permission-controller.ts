import express = require('express');

import LayerPermissionService = require('../services/layers-permission-service');

var router = express.Router();
var service = new LayerPermissionService();

router.get('/list', (req, res) => {
    console.log(req.query.layerID)
    service.getList(req.query.layerID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', (req, res) => {

    var LayerAdmin = <number>req.query.rowid;
    
    service.get(LayerAdmin).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/userlist', (req, res) => {

    var userid = <number>req.query.userid;
    
    service.getUserLayer(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/create', (req, res) => {
    
    var request = <App.LayerAdmin>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', (req, res) => {
    
    var request = <App.LayerAdmin>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', (req, res) => {
    
    var ID = <number>req.queryID;
    console.log (ID);
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;