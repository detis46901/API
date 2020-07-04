"use strict";
//import UserService = require('../services/users-service');
var AuthService = require('../services/authenticate-service');
var express = require('express');
var router = express.Router();
var service = new AuthService();
router.get('/list', function (req, res) {
    service.getList(req.query.email, req.query.password).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/single', function (req, res) {
    var User = req.query.rowid;
    service.get(User).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/', function (req, res) {
    var request = req.body;
    var row = 0;
    var admin = false;
    service.getList(request.email, request.password).then(function (result) {
        row = result[0].ID;
        admin = result[0].administrator;
        if (result.length == 0) {
            res.send({});
        }
        else {
            console.log("Authentation Passed");
            res.send(JSON.stringify({ token: 'fake-jwt-token2', userid: row, admin: admin }));
        }
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/update', function (req, res) {
    var request = req.body;
    service.update(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.delete('/delete', function (req, res) {
    var rowID = req.query.rowID;
    service.delete(rowID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/users/controllers/authenticate-controller.js.map
