"use strict";
var express = require('express');
var UserService = require('../services/users-service');
var AuthService = require('../services/authenticate-service');
var jwt = require('jsonwebtoken');
var router = express.Router();
var service = new UserService();
var authService = new AuthService();
var jwt_secret = "cityofkokomo46901";
router.get('/list', function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', function (req, res) {
    var User = req.query.rowid;
    service.get(User).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getbyrole', function (req, res) {
    var roleID = req.query.roleID;
    service.getByRole(roleID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/create', function (req, res) {
    var request = req.body;
    service.create(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/login', function (req, res) {
    // var request = <App.User>req.body;
    // service.create(request).then(function (result) {
    //     res.send(result);
    // }).catch(function (error) {
    //     res.send(error);
    // });
    /*From 'authenticate-controller.ts'/authenticate*/
    var request = req.body;
    var row = 0;
    var admin = false;
    console.log(req);
    authService.getList(request.email, request.password).then(function (user) {
        //row = result[0].ID
        //admin = result[0].administrator
        //if (result.length==0){res.send({}) } else  {res.send(JSON.stringify({ token: 'fake-jwt-token2', userid: row, admin: admin }));}
        if (user.length < 1) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        else {
            var token = jwt.sign({
                email: user[0].email,
                ID: user[0].ID
            }, jwt_secret, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                message: "Auth successful",
                token: token
            });
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
    var ID = req.query.ID;
    console.log(ID);
    service.delete(ID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/users/controllers/users-controller.js.map
