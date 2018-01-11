"use strict";
var express = require('express');
var UserService = require('../services/users-service');
var UserModel = require('../models/users-model');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();
var service = new UserService();
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
//1/3/18: Robust way to do /create and /login
router.post('/create', function (req, res) {
    var request = req.body;
    UserModel.Model.findAll({
        where: { email: request.email }
    }).then(function (user) {
        if (user.length >= 1) {
            return res.status(422).json({
                message: "User already exists."
            });
        }
        else {
            bcrypt.hash(request.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: "Hash failed."
                    });
                }
                else {
                    request.password = hash;
                    service.create(request)
                        .then(function (result) {
                        res.status(201).json({
                            message: "User created."
                        });
                    }).catch(function (err) {
                        res.status(500).json({
                            error: err,
                            message: "User could not be created. Check email to ensure it is in the correct format."
                        });
                    });
                }
            });
        }
    }).catch(function (err) {
        res.status(500).json({
            message: "Model could not be created.",
            error: err
        });
    });
});
router.put('/updatePassword', function (req, res) {
    console.log("\n\nhere\n\n");
    bcrypt.compare(req.body.oldPassword, req.body.password, function (err, result) {
        if (err) {
            return res.status(500).json({
                message: 'bcrypt hash comparison failure. Try again in a few minutes.'
            });
        }
        else if (result) {
            bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: "Hash failed."
                    });
                }
                else {
                    req.body.password = hash;
                    req.body.currUser.password = hash;
                    service.update(req.body.currUser)
                        .then(function (result) {
                        res.status(204).json({
                            message: "Hash compare successful. Password updated.",
                            user: req.body.currUser
                        });
                    }).catch(function (err) {
                        res.status(500).json({
                            error: err,
                            message: "Password could not be changed."
                        });
                    });
                }
            });
        }
        else if (!result) {
            return res.status(401).json({
                message: 'Authorization failed.'
            });
        }
    });
});
router.post('/login', function (req, res) {
    UserModel.Model.findAll({
        where: { email: req.body.email }
    }).then(function (user) {
        if (user.length < 1) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'bcrypt hash comparison failure. Try again in a few minutes.'
                });
            }
            else if (result) {
                var login_token = jwt.sign({
                    email: user[0].email,
                    ID: user[0].ID
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "30 days"
                });
                return res.status(200).json({
                    message: "Token granted.",
                    token: login_token,
                    userID: user[0].ID,
                    admin: user[0].administrator
                });
            }
            else if (!result) {
                return res.status(401).json({
                    message: 'Authorization failed.'
                });
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            error: err
        });
    });
});
//This request generates an API key (JWT) to be used for Google Earth KML files and such. Not to be confused with login "session" JWT above.
router.post('/generatekey', function (req, res) {
    UserModel.Model.findAll({
        where: { email: req.body.email }
    }).then(function (user) {
        if (user.length < 1) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'bcrypt hash comparison failed.'
                });
            }
            if (result) {
                var api_token = jwt.sign({
                    email: user[0].email,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "30 days"
                });
                return res.status(200).json({
                    message: "Token granted.",
                    token: api_token,
                    userID: user[0].ID,
                    admin: user[0].administrator
                });
            }
            else if (!result) {
                return res.status(401).json({
                    message: 'Authorization failed.'
                });
            }
        });
    }).catch(function (err) {
        return res.status(500).json({
            error: err
        });
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
