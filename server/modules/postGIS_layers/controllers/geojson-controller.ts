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

router.get('/create', token_auth, (req, res) => {
    
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
// router.post('/create', (req, res) => {
    
//     var request = <App.User>req.body;
//     console.log(request)
//     service.create(request).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });

// });

// router.put('/update', (req, res) => {
    
//     var request = <App.User>req.body;

//     service.update(request).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });

// });

// router.delete('/delete', (req, res) => {
    
//     var ID = <number>req.query.ID;
//     console.log (ID);
//     service.delete(ID).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });

//});


export = router;