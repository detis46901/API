"use strict";
var SQLService = require('../services/sql-service');
var token_auth = require('../../JWT_Checker/loginToken.js');
var api_auth = require('../../JWT_Checker/apiKeyToken');
var layers_permissions_1 = require('../../layers/controllers/layers-permissions');
var GroupMemberService = require('../../users/services/group-member-service');
var LayerPermissionService = require('../../layers/services/layers-permission-service');
var stream = require('stream');
var express = require('express');
var multer = require('multer');
var multerConfig = {
    storage: multer.memoryStorage()
};
var router = express.Router();
var service = new SQLService();
var groupMemberService = new GroupMemberService;
var layerPermissionService = new LayerPermissionService;
var layerPermissions = new layers_permissions_1.LayerPermissions(groupMemberService, layerPermissionService);
router.get('/all', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    schema = "'" + schema + "'";
    service.get(schema, table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/getsheets', api_auth, function (req, res) {
    var schema = req.query.schema;
    if (schema == undefined) {
        schema = 'mycube';
    }
    var table = req.query.table;
    //schema = "'" + schema + "'"
    service.getUserFromAPIKey(req.query.apikey).then(function (x) {
        console.log(x);
        try {
            layerPermissions.getPermissions(x[0]['ID']).then(function (y) {
                console.log(y[0].group);
            });
            if (x[0]['ID'] > 0) {
                service.getsheets(schema, table).then(function (result) {
                    res.send(result);
                }).catch(function (error) {
                    res.send(error);
                });
            }
            else {
                res.send('Not going to happen');
            }
        }
        catch (e) {
            res.send('not going to happen');
        }
    });
});
router.get('/getschema', token_auth, function (req, res) {
    var table = req.query.table;
    var schema = req.query.schema;
    service.getschema(schema, table).then(function (result) {
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
router.get('/constraints', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    service.getConstraints(schema, table).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/updateconstraint', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    var myCubeField = JSON.parse(req.query.myCubeField);
    service.updateConstraint(schema, table, myCubeField).then(function (result) {
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
    var myCubeField = JSON.parse(req.query.myCubeField);
    service.addColumn(table, field, type, label, myCubeField).then(function (result) {
        var constraint = "";
        var i = 0;
        myCubeField.constraints.forEach(function (x) {
            constraint = constraint + '"' + myCubeField.field + '"' + "='" + x.name + "'";
            if (i < myCubeField.constraints.length - 1) {
                constraint = constraint + " OR ";
            }
            i = +1;
        });
        service.addConstraint('mycube', table, myCubeField.field, constraint).then(function (result) {
        });
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/deleteColumn', token_auth, function (req, res) {
    var table = req.query.table;
    var myCubeField = JSON.parse(req.query.myCubeField);
    service.deleteColumn(table, myCubeField).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/moveColumn', token_auth, function (req, res) {
    var table = req.query.table;
    var myCubeField = JSON.parse(req.query.myCubeField);
    service.moveColumn(table, myCubeField).then(function (result) {
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
router.get('/single', token_auth, function (req, res) {
    var table = req.query.table;
    var id = req.query.id;
    service.getsingle(table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/anyone', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    var field = req.query.field;
    var value = req.query.value;
    service.getanysingle(schema, table, field, value).then(function (result) {
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
router.get('/singlelog', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    var id = req.query.id;
    service.getSingleLog(schema, table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
// router.post('/addcommentwithgeom', token_auth, (req, res) => {
//     var comment = <App.MyCubeComment>req.body;
//     var table = <number>comment.table;
//     service.addCommentWithGeom(comment).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });
// })
// router.post('/addcommentwithoutgeom', token_auth, (req, res) => {
//     var file = <File>req.body.file
//     var comment = <App.MyCubeComment>req.body;
//     var table = <number>comment.table;
//     service.addCommentWithoutGeom(comment).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });
// })
router.post('/addanycommentwithoutgeom', token_auth, function (req, res) {
    var file = req.body.file;
    var comment = req.body;
    service.addAnyCommentWithoutGeom(comment).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.post('/addimage', multer(multerConfig).single('photo'), function (req, res) {
    service.addImage(req).then(function (result) {
        res.send(result);
    });
});
router.post('/addanyimage', multer(multerConfig).single('photo'), function (req, res) {
    service.addAnyImage(req).then(function (result) {
        res.send(result);
    });
});
router.get('/getimage', function (req, res) {
    service.getImage(req.query.table, req.query.id).then(function (file) {
        var fileContents = Buffer.from(file[0][0].file, "utf8");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);
        res.set('Content-disposition', 'attachment; filename=' + file[0][0].filename);
        res.set('Content-Type', 'image/png');
        readStream.pipe(res);
    }).catch(function (err) {
        res.json({ msg: 'Error', detail: err });
    });
});
router.get('/getanyimage', function (req, res) {
    service.getAnyImage(req.query.schema, req.query.table, req.query.id).then(function (file) {
        var fileContents = Buffer.from(file[0][0].file, "utf8");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);
        res.set('Content-disposition', 'attachment; filename=' + file[0][0].filename);
        res.set('Content-Type', 'image/png');
        readStream.pipe(res);
    }).catch(function (err) {
        res.json({ msg: 'Error', detail: err });
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
router.get('/addAnyRecord', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    var field = req.query.field;
    var value = req.query.value;
    service.addAnyRecord(schema, table, field, value).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.get('/fixGeometry', token_auth, function (req, res) {
    var table = req.query.table;
    service.fixGeometry(table).then(function (result) {
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
router.get('/deleteAnyRecord', token_auth, function (req, res) {
    var schema = req.query.schema;
    var table = req.query.table;
    var id = req.query.id;
    service.deleteAnyRecord(schema, table, id).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/update', token_auth, function (req, res) {
    var table = req.body.table;
    var id = req.body.id;
    var field = req.body.mycubefield.field;
    var type = req.body.mycubefield.type;
    var value = req.body.mycubefield.value;
    service.update(table, id, field, type, value).then(function (result) {
        res.send(result);
    }).catch(function (error) {
        res.send(error);
    });
});
router.put('/updateAnyRecord', token_auth, function (req, res) {
    var schema = req.body.schema;
    var table = req.body.table;
    var id = req.body.id;
    var field = req.body.datafield.field;
    var type = req.body.datafield.type;
    var value = req.body.datafield.value;
    service.updateAnyRecord(schema, table, id, field, type, value).then(function (result) {
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
