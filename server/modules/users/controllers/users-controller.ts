import express = require('express');
import UserService = require('../services/users-service');
import AuthService = require('../services/authenticate-service');
import sequalizeModel = require("../models/users-model");
import Sequelize = require('sequelize');
import jwt = require('jsonwebtoken');

var router = express.Router();
var service = new UserService();
var authService = new AuthService();
var jwt_secret = "cityofkokomo46901"

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

router.get('/getbyrole', (req, res) => {
    var roleID = <number>req.query.roleID

    service.getByRole(roleID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
});

router.post('/create', (req, res) => {
    var request = <App.User>req.body;

    service.create(request).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});

router.post('/login', (req, res) => {
    // var request = <App.User>req.body;

    // service.create(request).then(function (result) {
    //     res.send(result);
    // }).catch(function (error) {
    //     res.send(error);
    // });

    /*From 'authenticate-controller.ts'/authenticate*/
    var request = <App.User>req.body;
    
    var row = 0
    var admin = false
    console.log(req)
    authService.getList(request.email, request.password).then((user) => {
        //row = result[0].ID
        //admin = result[0].administrator
        //if (result.length==0){res.send({}) } else  {res.send(JSON.stringify({ token: 'fake-jwt-token2', userid: row, admin: admin }));}
        if(user.length < 1) {
            return res.status(404).json({
                message: 'User not found.'
            })
        } else {
            const token = jwt.sign({
                email: user[0].email,
                ID: user[0].ID
            }, 
            jwt_secret,
            {
                expiresIn: "1h"
            }
        );
        return res.status(200).json({
            message: "Auth successful",
            token: token
        })

        }
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
    var ID = <number>req.query.ID;
    console.log (ID);
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;