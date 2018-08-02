import GroupMemberModel = require('../models/group-member-model');
import GroupMemberService = require('../services/group-member-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new GroupMemberService;

router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getbyuser', token_auth, (req, res) => {
    var userid = <number>req.query.userid;
    service.getByUser(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getbygroup', token_auth, (req, res) => {
    var groupid = <number>req.query.groupid;
    service.getByGroup(groupid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/one', token_auth, (req, res) => {
    var request = <number>req.query.rowid;
    service.get(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.post('/create', token_auth, (req, res) => {
    var request = <App.GroupMember>req.body;
    service.create(request).then((result) => {
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