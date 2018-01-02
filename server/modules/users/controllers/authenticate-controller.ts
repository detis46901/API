import express = require('express');

//import UserService = require('../services/users-service');
import AuthService = require('../services/authenticate-service')
import UserModel = require ('../models/users-model')

var router = express.Router();
var service = new AuthService();

router.get('/list', (req, res) => {
    console.log(req.query.searchValue)
    service.getList(req.query.email, req.query.password).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', (req, res) => {

    var User = <number>req.query.rowid;
    
    service.get(User).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/', (req, res) => {
    
    var request = <App.User>req.body;
    var row = 0
    var admin = false
    console.log(req)
    service.getList(request.email, request.password).then((result) => {
        console.log(result)
        row = result[0].ID
        admin = result[0].administrator
        console.log('admin =' + admin)
       if (result.length==0){res.send({}) } else  {res.send(JSON.stringify({ token: 'fake-jwt-token2', userid: row, admin: admin }));}
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', (req, res) => {
    
    var request = <App.User>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', (req, res) => {
    
    var rowID = <number>req.query.rowID;

    service.delete(rowID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;