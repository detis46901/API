import express = require('express');

import GroupService = require('../services/group-service');

var router = express.Router();
var service = new GroupService();

router.get('/list', (req, res) => {
    
    service.getList(req.query.searchValue).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
    
});

router.get('/getbydept', (req, res) => {
    var departmentID = <number>req.query.departmentID;

    service.getByDepartment(departmentID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
});

router.get('/one', (req, res) => {

    var User = <number>req.query.rowid;
    
    service.get(User).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.post('/create', (req, res) => {
    
    var request = <App.Group>req.body;
    
    service.create(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/update', (req, res) => {
    
    var request = <App.Group>req.body;

    service.update(request).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });


});

router.delete('/delete', (req, res) => {
    
    var rowID = <number>req.query.ID;

    service.delete(rowID).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});


export = router;