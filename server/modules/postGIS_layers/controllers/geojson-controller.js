"use strict";
var express = require('express');
var geoJSONService = require('../services/geojson-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var router = express.Router();
var service = new geoJSONService();
// router.get('/list', (req, res) => {
//     service.getList(req.query.searchValue).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });
// });
router.get('/all', token_auth, function (req, res) {
    var table = req.query.table;
    service.get(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/create', token_auth, function (req, res) {
    var table = req.query.table;
    service.create(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/addColumn', token_auth, function (req, res) {
    console.log(req);
    var table = req.query.table;
    var field = req.query.field;
    var type = req.query.type;
    console.log('table=' + table);
    console.log('field=' + field);
    console.log('type=' + type);
    service.addColumn(table, field, type).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deleteTable', token_auth, function (req, res) {
    console.log(req);
    var table = req.query.table;
    service.deleteTable(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/updateGeometry', token_auth, function (req, res) {
    console.log(req);
    var table = req.query.table;
    var geometry = req.query.geometry;
    var id = req.query.id;
    service.updateGeometry(table, geometry, id).then(function (result) {
        res.send(result);
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/controllers/geojson-controller.js.map
