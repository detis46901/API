import NotificationService = require('../services/notification-service');
import token_auth = require('../../JWT_Checker/loginToken');

var express = require('express');
var router = express.Router();
var service = new NotificationService();

router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/getbyuser', token_auth, (req, res) => {
    var userID = <number>req.query.userID;
    service.getByUser(userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/one', token_auth, (req, res) => {
    var Notif = <number>req.query.rowid;
    
    service.get(Notif).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/create', token_auth, (req, res) => {
    var request = <App.Notification>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


router.put('/update', token_auth, (req, res) => {
    var request = <App.Notification>req.body;

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