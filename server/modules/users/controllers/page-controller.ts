import express = require('express');

import PageService = require('../services/page-service');

var router = express.Router();
var service = new PageService();

router.get('/list', (req, res) => {
    
    service.getList(req.query.userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/default', (req, res) => {
    
    service.getDefault(req.query.userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', (req, res) => {

    var Page = <number>req.query.rowid;
    
    service.get(Page).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/create', (req, res) => {
    
    var request = <App.UserPage>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', (req, res) => {
    
    var request = <App.UserPage>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', (req, res) => {
    
    var rowID = <number>req.query.rowID;
    console.log (rowID);
    service.delete(rowID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;