"use strict";
var express = require('express');
var ParentService = require("./parent-service");
var router = express.Router();
var service = new ParentService();
//assign "var service = new ____Service();" in children
router.get('/list', function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', function (req, res) {
    service.get(req.query.rowid).then(function (result) {
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

//# sourceMappingURL=../../../source-maps/modules/users/controllers/parent-controller.js.map
