// import express = require('express');
// import sequalizeModel = require("../models/users-model");
// import Sequelize = require('sequelize');
// import jwt = require('jsonwebtoken');
// import bcrypt = require('bcrypt');
// import token_auth = require('./JWT_Checker/loginToken'); //broken links

//import ParentService = require ("./parent-service");

var express = require('express');
var router = express.Router();
var service// = new ParentService()
//assign "var service = new ____Service();" in children

router.get('/list', (req, res) => {
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', (req, res) => {   
    service.get(req.query.rowid).then((result) => {
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

    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});