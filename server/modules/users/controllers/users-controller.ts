import express = require('express');
import UserService = require('../services/users-service');
import UserModel = require('../models/users-model');
import sequalizeModel = require("../models/users-model");
import Sequelize = require('sequelize');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import token_auth = require('../../JWT_Checker/authorize.js');

var router = express.Router();
var service = new UserService();

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
            if(result) { //If input pw hash matches db pw hash
                const login_token = jwt.sign(
                    {
                        email: user[0].email,
                        ID: user[0].ID
                    }, 
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "30 days"
                    }
                );
                return res.status(200).json({
                    message: "Token granted.",
                    token: login_token
                });
            } else if(!result) { //If hash comparison does not match
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

//This request generates an API key (JWT) to be used for Google Earth KML files and such. Not to be confused with login "session" JWT above.
router.post('/generatekey', (req, res) => {
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
            if(result) {
                const api_token = jwt.sign(
                    {
                        email: user[0].email,
                        ID: user[0].ID //Use first+last name combo instead of ID to ensure key is different than login key
                    }, 
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: "30 days"
                    }
                );
                return res.status(200).json({
                    message: "Token granted.",
                    token: api_token
                });
            } else if(!result) { //If hash comparison does not match
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
})

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