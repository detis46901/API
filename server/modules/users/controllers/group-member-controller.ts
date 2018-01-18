import express = require('express');
import GroupMemberModel = require('../models/group-member-model')
import GroupMemberService = require('../services/group-member-service')

var router = express.Router();
var service = new GroupMemberService;

router.get('/list', (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', (req, res) => {
    var request = <number>req.query.rowid;  
    service.get(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.post('/create', (req, res) => {  
    var request = <App.GroupMember>req.body;  
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.delete('/delete', (req, res) => {
    var ID = <number>req.query.ID;
    console.log (ID);
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

export = router;