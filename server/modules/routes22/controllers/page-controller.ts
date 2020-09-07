import PageService = require('../services/page-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new PageService();

router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/activebyuserid', token_auth, (req, res) => {
    service.getActiveByUserID(req.query.userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/default', token_auth, (req, res) => {
    service.getDefault(req.query.userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/single', token_auth, (req, res) => {
    var Page = <number>req.query.rowid;
    
    service.get(Page).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/single', token_auth, (req, res) => {
    var request = <App.UserPage>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {   
    var request = <App.UserPage>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', token_auth, (req, res) => {    
    var ID = <number>req.query.ID;

    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;