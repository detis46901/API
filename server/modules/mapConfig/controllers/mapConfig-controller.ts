import UserService = require('../../users/services/user-service');
import UserPageService = require('../../users/services/page-service')
import UserModel = require('../../users/models/user-model');
import sequalizeModel = require("../../users/models/user-model");
import Sequelize = require('sequelize');
import token_auth = require('../../JWT_Checker/loginToken')
import GroupMemberModel = require('../../users/models/group-member-model')
import GroupMemberService = require('../../users/services/group-member-service')
import UserPageLayerService = require('../../layers/services/user-page-layer-service');
import UserPageInstanceService = require('../../feature modules/services/user-page-instance-service')
import LayerPermissionController = require('../../layers/controllers/layers-permission-controller')
import LayerPermissionService = require('../../layers/services/layers-permission-service')
import UserPageLayer = require('../../layers/models/user-page-layer-model')
import { environment } from '../../../core/environment'
import { LayerPermissions } from '../../layers/controllers/layers-permissions'
import { ModulePermissions } from '../../feature modules/controllers/module-permissions' 
//import { map } from 'bluebird';

var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();
var service = new UserService();
var userPageService = new UserPageService();
var userPageLayerService = new UserPageLayerService();
var userPageInstanceService = new UserPageInstanceService();
var groupMemberService = new GroupMemberService
var layerPermissionService = new LayerPermissionService
let layerPermissions = new LayerPermissions(groupMemberService, layerPermissionService)
let modulePermissions = new ModulePermissions()

router.get('/test', (req, res) => {
    console.log('testing')
    res.send('Test Passed')
})
router.get('/list', token_auth, (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/single', token_auth, (req, res) => {
    let job:boolean[] = []
    var mapConfig = <App.mapConfig>JSON.parse(req.query.mapconfig);
    userPageService.getActiveByUserID(mapConfig.user.ID).then((result) => {
        mapConfig.name = "Current"
        mapConfig.userpages = result
        let index = mapConfig.userpages.findIndex(x => x.default == true)
        if (index == -1) {index =0} //fixes the problem of no default page
        mapConfig.defaultpage = mapConfig.userpages[index];
        mapConfig.currentpage = mapConfig.userpages[index];
        job.push(true)
        userPageLayerService.getPageLayers(mapConfig.currentpage.ID).then((layers) => {
            mapConfig.userpagelayers = layers
            job.push(true)
            if(job.length == 4) {res.send(JSON.stringify(mapConfig))}
        })
        userPageInstanceService.getPageInstances(mapConfig.currentpage.ID).then((instances) => {
            mapConfig.userpageinstances = instances
            job.push(true)
            if(job.length == 4) {res.send(JSON.stringify(mapConfig))}
        })
    }).catch((error) => {
        res.send(error);
    });
    layerPermissions.getPermissions(mapConfig.user.ID).then((permissions) => {
        mapConfig.layerpermission = permissions
        modulePermissions.getPermissions(mapConfig.user.ID).then((modulePerm) => {
            mapConfig.modulepermission = modulePerm
            job.push(true)
            if(job.length == 4) {res.send(JSON.stringify(mapConfig))}
        })
    })
});




//1/3/18: Robust way to do /create and /login
router.post('/single', token_auth, (req, res) => {
    var request = <App.User>req.body;
    UserModel.model.findAll({
        where: { email: request.email }
    }).then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: "User already exists."
            })
        } else {
            bcrypt.hash(request.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: "Hash failed."
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
                                error: err,
                                message: "User could not be created. Check email to ensure it is in the correct format."
                            })
                        });
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Model could not be created.",
            error: err
        })
    })
});

router.put('/updatePassword', token_auth, (req, res) => {
    bcrypt.compare(req.body.oldPassword, req.body.password, (err, result) => {
        if (err) { //bcrypt hashing error
            return res.status(500).json({
                message: 'bcrypt hash comparison failure. Try again in a few minutes.'
            })
        } else if (result) {
            bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err,
                        message: "Hash failed."
                    })
                } else {
                    req.body.password = hash
                    req.body.currUser.password = hash
                    service.update(<App.User>req.body.currUser)
                        .then(result => {
                            res.status(204).json({
                                message: "Hash compare successful. Password updated.",
                                user: req.body.currUser
                            })
                        }).catch(err => {
                            res.status(500).json({
                                error: err,
                                message: "Password could not be changed."
                            })
                        })
                }
            })
        } else if (!result) {
            return res.status(401).json({
                message: 'Authorization failed.'
            })
        }
    })
})

router.post('/login', (req, res) => {
    UserModel.model.findAll({
        where: { email: req.body.email }
    }).then(user => {
        if (user.length < 1) { //If supplied email is not found as a user in the database
            return res.status(404).json({
                message: 'User not found.'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) { //bcrypt hashing error
                return res.status(500).json({
                    message: 'bcrypt hash comparison failure. Try again in a few minutes.'
                })
            } else if (result) { //If input pw hash matches db pw hash
                const login_token = jwt.sign(
                    {
                        email: user[0].email,
                        ID: user[0].ID
                    },
                    environment.JWT_SECRET_KEY,
                    {
                        expiresIn: "30 days"
                        //expiresIn: "10s" //testing
                    }
                );
                return res.status(200).json({
                    message: "Token granted.",
                    token: login_token,
                    userID: user[0].ID,
                    admin: user[0].administrator,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName
                });
            } else if (!result) { //If hash comparison does not match
                return res.status(401).json({
                    message: 'Authorization failed.'
                })
            }
        })
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    });
});

//This request generates an API key (JWT) to be used for Google Earth KML files and such. Not to be confused with login "session" JWT above.
router.post('/generatekey', token_auth, (req, res) => {
    UserModel.model.findAll({
        where: { email: req.body.email }
    }).then(user => {
        if (user.length < 1) { //If supplied email is not found as a user in the database
            return res.status(404).json({
                message: 'User not found.'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) { //bcrypt hashing error
                return res.status(500).json({
                    message: 'bcrypt hash comparison failed.'//1/11/18 erroring here
                })
            }
            if (result) {
                const api_token = jwt.sign(
                    {
                        email: user[0].email,
                        firstName: user[0].firstName, //Use first+last name combo instead of ID to ensure key is different than login key
                        lastName: user[0].lastName
                    },
                    environment.JWT_SECRET_KEY,
                    {
                        expiresIn: "30 days"
                    }
                );
                return res.status(200).json({
                    message: "Token granted.",
                    token: api_token,
                    userID: user[0].ID,
                    admin: user[0].administrator
                });
            } else if (!result) { //If hash comparison does not match
                return res.status(401).json({
                    message: 'Authorization failed.'
                })
            }
        })
    }).catch(err => {
        return res.status(500).json({
            error: err
        })
    });
})

router.put('/update', token_auth, (req, res) => {
    var request = <App.User>req.body;

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