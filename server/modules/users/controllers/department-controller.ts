import express = require('express');

import DepartmentService = require('../services/department-service');

var router = express.Router();
var service = new DepartmentService();

router.get('/list', (req, res) => {
    
    service.getList(req.query.searchValue).then((result) => {
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

router.post('/create', (req, res) => {
    
    var request = <App.User>req.body;
    console.log ("at department router.post/create")
    service.create(request).then((result) => {
        res.send(result);
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