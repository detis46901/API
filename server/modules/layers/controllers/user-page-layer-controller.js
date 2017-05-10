"use strict";
var express = require('express');
var UserPageLayer = require('../services/user-page-layer-service');
var router = express.Router();
var service = new UserPageLayer();
router.get('/list', function (req, res) {
    console.log(req.query.pageID);
    service.getList(req.query.pageID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', function (req, res) {
    var LayerAdmin = req.query.rowid;
    service.get(LayerAdmin).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getpagelayers', function (req, res) {
    var PageID = req.query.pageID;
    service.getPageLayers(PageID).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/userlist', function (req, res) {
    var userid = req.query.userid;
    service.getUserLayer(userid).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/create', function (req, res) {
    var request = req.body;
    service.create(request).then(function (result) {
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
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/layers/controllers/user-page-layer-controller.js.map
