import express = require('express');
import UserService = require('../services/users-service');
import UserModel = require('../models/users-model');
import AuthService = require('../services/authenticate-service');
import sequalizeModel = require("../models/users-model");
import Sequelize = require('sequelize');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');

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

//1/3/18: Robust way to do /create and /login
router.post('/create', (req, res) => {
    var request = <App.User>req.body;
    UserModel.Model.findAll({
        where: { email: request.email}
    }).then(user => {
        if(user.length >= 1) {
            return res.status(422).json({
                message: "User already exists."
            })
        } else {
            bcrypt.hash(request.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error:err,
                        message:"Hash failed."
                    })
                } else {
                    request.password = hash
                    service.create(request)
                    .then(result => {
                        res.status(201).json({
                            message: "User created."
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error:err,
                            message:"User could not be created. Check email to ensure it is in the correct format."
                        })
                    });
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message:"Model could not be created.",
            error:err
        })
    })
});

router.post('/login', (req, res) => {
    UserModel.Model.findAll({
        where: {email: req.body.email}
    }).then(user => {
        if(user.length < 1) { //If supplied email is not found as a user in the database

            return res.status(404).json({
                message: 'User not found.'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) { //bcrypt hashing error
                return res.status(500).json({
                    message: 'bcrypt hash comparison failed.'
                })
            } 
            if(result) { //If hash comparison is correct
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        ID: user[0].ID
                    }, 
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Token granted.",
                    token: token
                });
            } else if(!result) { //If hash comparison is incorrect
                return res.status(401).json({
                    message: 'Authorization failed.'
                })
            }
        })   
    }).catch(err => {
        return res.status(500).json({
            error:err
        })
    });
});

// router.post('/login', (req, res) => {
//     // var request = <App.User>req.body;

//     // service.create(request).then(function (result) {
//     //     res.send(result);
//     // }).catch(function (error) {
//     //     res.send(error);
//     // });

//     /*From 'authenticate-controller.ts'/authenticate*/
//     var request = <App.User>req.body;
    
//     var row = 0
//     var admin = false
//     console.log(req)
//     authService.getList(request.email, request.password).then((user) => {
//         //row = result[0].ID
//         //admin = result[0].administrator
//         //if (result.length==0){res.send({}) } else  {res.send(JSON.stringify({ token: 'fake-jwt-token2', userid: row, admin: admin }));}
//         if(user.length < 1) {
//             console.log("user.length < 1")
//             return res.status(404).json({
//                 message: 'User not found.'
                
//             })
//         } else {
//             console.log("got token")
//             const token = jwt.sign({
//                 email: user[0].email,
//                 ID: user[0].ID
//             }, 
//             jwt_secret,
//             {
//                 expiresIn: "1h"
//             }
//         );
//         return res.status(200).json({
//             message: "Auth successful",
//             token: token
//         })

//         }
//     }).catch((error) => {
//         res.send(error);
//     });
// });

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