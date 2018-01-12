import express = require('express');
import SQLService = require('../services/sql-service');
import token_auth = require('../../JWT_Checker/loginToken.js');

var router = express.Router();
var service = new SQLService();

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

router.get('/getschema', token_auth, (req, res) => {
    
        var table = <string>req.query.table;
        
        service.getschema(table).then((result) => {
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
    console.log(req)
    var table = <string>req.query.table;
    var field = <string>req.query.field;
    var type = <string>req.query.type
    console.log('table=' + table)
    console.log('field=' + field)
    console.log('type=' + type)
    service.addColumn(table,field,type).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/deleteTable', token_auth, (req, res) => {
    console.log(req)
    var table = <string>req.query.table;
    
    service.deleteTable(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/one', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.getsingle(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
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

 router.get('/update', token_auth, (req, res) => {
    
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    var field = <string>req.query.field;
    var type = <string>req.query.type;
    var value = <any>req.query.value;

     service.update(table, id, field, type, value).then((result) => {
         res.send(result);
     }).catch((error) => {
         res.send(error);
     });

 });

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