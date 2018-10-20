"use strict";
var SQLService = require('../services/sql-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var express = require('express');
var router = express.Router();
var service = new SQLService();
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
router.get('/getsheets', token_auth, function (req, res) {
    var table = req.query.table;
    service.getsheets(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getschema', token_auth, function (req, res) {
    var table = req.query.table;
    service.getschema(table).then(function (result) {
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
router.get('/createcommenttable', token_auth, function (req, res) {
    var table = req.query.table;
    service.createCommentTable(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/addColumn', token_auth, function (req, res) {
    var table = req.query.table;
    var field = req.query.field;
    var type = req.query.type;
    var label = req.query.label;
    service.addColumn(table, field, type, label).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deleteTable', token_auth, function (req, res) {
    var table = req.query.table;
    service.deleteTable(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deletecommenttable', token_auth, function (req, res) {
    var table = req.query.table;
    service.deleteCommentTable(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/one', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    service.getsingle(table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getcomments', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    service.getcomments(table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/addcommentwithgeom', token_auth, function (req, res) {
    var comment = req.body;
    console.log(comment);
    var table = comment.table;
    service.addCommentWithGeom(comment).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/addcommentwithoutgeom', token_auth, function (req, res) {
    var comment = req.body;
    console.log(comment);
    var table = comment.table;
    service.addCommentWithoutGeom(comment).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deletecomment', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    service.deleteComment(table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/addRecord', token_auth, function (req, res) {
    var table = req.query.table;
    var geometry = req.query.geometry;
    service.addRecord(table, geometry).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deleteRecord', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    service.deleteRecord(table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/update', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    var field = req.query.field;
    var type = req.query.type;
    var value = req.query.value;
    service.update(table, id, field, type, value).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/setSRID', token_auth, function (req, res) {
    var table = req.query.table;
    service.setSRID(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
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
router.get('/getOID', token_auth, function (req, res) {
    var table = req.query.table;
    service.getOID(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getColumnCount', token_auth, function (req, res) {
    var table = req.query.table;
    service.getColumnCount(table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
    router.get('/getIsLabel', token_auth, function (req, res) {
        var oid = req.query.oid;
        var field = req.query.field;
        service.getIsLabel(oid, field).then(function (result) {
            res.send(result);
        }).catch(function (error) {
            res.send(error);
        });
    });
});
module.exports = router;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/controllers/sql-controller.js.map
