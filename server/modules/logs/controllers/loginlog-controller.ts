import LoginLogService = require('../services/loginlog-service');
import loginLogModel = require('../models/loginlog-model');
import token_auth = require('../../JWT_Checker/loginToken')

var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var router = express.Router();
var service = new LoginLogService();

router.get('/test', (req, res) => {
    res.send('Test Passed')
})

router.post('/single', (req, res) => {
    var request = <App.LoginLog>req.body;
    service.create(request)
                    .then(result => {
                        res.status(201).json({
                            message: "Login Log created."
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error:err,
                            message:"Login Log could not be created. Check email to ensure it is in the correct format."
                        })
                    });
});

export = router;