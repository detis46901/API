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

router.get('/byuser', token_auth, (req, res) => {
    var userID = <number>req.query.userID;
    service.getByUser(userID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/bytype', token_auth, (req, res) => {
    var type = <string>req.query.objectType;
    service.getByType(type).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/bysource', token_auth, (req, res) => {
    var sourceID = <number>req.query.sourceID;
    service.getBySource(sourceID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/single', token_auth, (req, res) => {
    var notif = <number>req.query.rowid;
    
    service.get(notif).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/single', token_auth, (req, res) => {
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