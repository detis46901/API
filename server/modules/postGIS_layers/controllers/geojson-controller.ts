import geoJSONService = require('../services/geojson-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var express = require('express');
var router = express.Router();
var service = new geoJSONService();

// router.get('/list', (req, res) => {
    
//     service.getList(req.query.searchValue).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });
    
// });

router.get('/all', token_auth, (req, res) => {

    var table = <string>req.query.table;
    
    service.get(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/some', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var where = <string>req.query.where;
    service.getSome(table, where)
        .then((result) => {
            res.send(result);})
        .catch((error) => {
            res.send(error);
    })
})

router.get('/single', token_auth, (req, res) => {
    
        var table = <string>req.query.table;
       
        
        service.create(table).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    
    });

router.get('/addColumn', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var field = <string>req.query.field;
    var type = <string>req.query.type

    service.addColumn(table,field,type).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });    
});

router.get('/deleteTable', token_auth, (req, res) => {      
    var table = <string>req.query.table;
    
    service.deleteTable(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/updateGeometry', token_auth, (req, res) => {
    let table = <string>req.query.table;
    let geometry = <string>req.query.geometry;
    let id = <string>req.query.id;
    service.updateGeometry(table, geometry, id).then(result => {
        res.send(result)
    })
})

export = router;