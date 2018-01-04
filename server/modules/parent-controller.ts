import express = require('express');
import Sequelize = require('sequelize');
import jwt = require('jsonwebtoken');
import bcrypt = require('bcrypt');
import token_auth = require('./JWT_Checker/authorize');
//import ParentService = require('./parent-service')

var router = express.Router();
var service// = new ParentService();
//"var service = new ______Service()" in child component

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

router.put('/update', (req, res) => {
    service.update(req.body).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.delete('/delete', (req, res) => {
    service.delete(req.query.ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

export = router;