import express = require('express');
import GroupService = require('../services/group-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var router = express.Router();
var service = new GroupService();

//how to inherit from parent controller

router.get('/list', token_auth, (req, res) => {
    
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/single', token_auth, (req, res) => {

    var User = <number>req.query.rowid;
    
    service.get(User).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/single', token_auth, (req, res) => {
    
    var request = <App.Group>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    
    var request = <App.Group>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });


});

router.delete('/delete', token_auth, (req, res) => {
    
    var rowID = <number>req.query.ID;

    service.delete(rowID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;