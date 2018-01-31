import express = require('express');
import UserPageLayer = require('../services/user-page-layer-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var router = express.Router();
var service = new UserPageLayer();

router.get('/list', token_auth, (req, res) => {
    console.log(req.query.pageID)
    service.getList(req.query.pageID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/one', token_auth, (req, res) => {

    var LayerID = <number>req.query.rowid;
    
    service.get(LayerID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getpagelayers', token_auth, (req, res) => {

    var PageID = <number>req.query.pageID;
    
    service.getPageLayers(PageID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/userlist', token_auth, (req, res) => {

    var userid = <number>req.query.userid;
    
    service.getUserLayer(userid).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getbylayer', token_auth, (req, res) => {
    var layerID = <number>req.query.layerID;

    service.getByLayer(layerID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.post('/create', token_auth, (req, res) => {
    
    var request = <App.Layer>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', token_auth, (req, res) => {
    
    var request = <App.Layer>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.delete('/delete', token_auth, (req, res) => {
    
    var ID = <number>req.query.ID;
    console.log (req.query.ID);
    service.delete(ID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;