import domainService = require('../services/domain-service')
import DomainModel = require('../models/domain-model')

import token_auth = require('../../JWT_Checker/loginToken.js');
var stream = require('stream');
var express = require('express');

var router = express.Router();
var service = new domainService();

router.get('/test', (req, res) => {
    console.log('testing')
    DomainModel.Model.findAll().then()
    res.send('Test Passed')
})

export = router