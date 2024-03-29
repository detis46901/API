import ModuleService = require('../services/module-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new ModuleService();
router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/single', token_auth, (req, res) => {
    var LayerID = <number>req.query.rowid;
    service.get(LayerID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.post('/single', token_auth, (req, res) => {
    var request = <App.Module>req.body;
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.put('/update', token_auth, (req, res) => {  
    var request = <App.Module>req.body;
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
});

export = router;