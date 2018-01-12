import express = require('express');
import LayerAdminService = require('../services/layers-admin-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var router = express.Router();
var service = new LayerAdminService();

router.get('/list', token_auth, (req, res) => {
    
    service.getList(req.query.searchValue).then((result) => {
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
    console.log(token_auth)
    var request = <App.LayerAdmin>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
        console.log(result)
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    
    var request = <App.LayerAdmin>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', token_auth, (req, res) => {
    
    var ID = <number>req.query.ID;
    console.log (ID);
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;