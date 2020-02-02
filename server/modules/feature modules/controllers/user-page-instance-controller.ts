import UserPageInstance = require('../services/user-page-instance-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new UserPageInstance();

router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.pageID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/single', token_auth, (req, res) => {
    var InstanceID = <number>req.query.rowid;
    service.get(InstanceID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getpageinstances', token_auth, (req, res) => {
    var PageID = <number>req.query.pageID;
    service.getPageInstances(PageID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/userlist', token_auth, (req, res) => {
    var userid = <number>req.query.userid;
    service.getUserInstance(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getbyinstance', token_auth, (req, res) => {
    var instanceID = <number>req.query.instanceID;
    service.getByInstance(instanceID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.post('/single', token_auth, (req, res) => {   
    var request = <App.UserPageInstance>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    var request = <App.UserPageInstance>req.body;

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