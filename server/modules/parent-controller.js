"use strict";
var express = require('express');
//import ParentService = require('./parent-service')
var router = express.Router();
var service; //= new ParentService();
//"var service = new ______Service()" in child component
router.get('/list', function (req, res) {
    service.getList(req.query.searchValue).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/single', function (req, res) {
    service.get(req.query.rowid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/update', function (req, res) {
    service.update(req.body).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.delete('/delete', function (req, res) {
    service.delete(req.query.ID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
module.exports = router;

//# sourceMappingURL=../source-maps/modules/parent-controller.js.map
