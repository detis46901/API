import SQLService = require('../services/sql-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import api_auth = require('../../JWT_Checker/apiKeyToken')
import comment = require('../models/postGIS_layers.model')
import { error } from 'util';
var stream = require('stream');

var express = require('express');
var multer = require('multer'); const multerConfig = {
    storage: multer.memoryStorage()
};
var router = express.Router();
var service = new SQLService();

router.get('/all', token_auth, (req, res) => {
    var schema = <string>req.query.schema
    var table = <string>req.query.table;
    schema = "'" + schema + "'"
    service.get(schema, table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getsheets', api_auth, (req, res) => {
    var schema = <string>req.query.schema
    if (schema == undefined) {
        schema = 'mycube'
    }
    var table = <string>req.query.table;
    //schema = "'" + schema + "'"
    service.getUserFromAPIKey(req.query.apikey).then((x) => {
        console.log(x)
        try {
            if(x[0]['ID'] > 0) {  //need to fix this so this authorizes the user
                service.getsheets(schema, table).then((result) => {
                    res.send(result);
                }).catch((error) => {
                    res.send(error);
                });
            }
            else {
                res.send('Not going to happen')
            }    
        }
        catch(e) {
            res.send('not going to happen');
        }
    })
});

router.get('/getschema', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var schema = <string>req.query.schema;
    service.getschema(schema, table).then((result) => {
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

router.get('/constraints', token_auth, (req, res) => {
    var schema = <string>req.query.schema
    var table = <string>req.query.table
    service.getConstraints(schema, table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
})

router.get('/updateconstraint', token_auth, (req, res) => {
    var schema = <string>req.query.schema
    var table = <string>req.query.table
    var myCubeField = <comment.MyCubeField>JSON.parse(req.query.myCubeField)
    service.updateConstraint(schema, table, myCubeField).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send(error)
    })
})

router.get('/createcommenttable', token_auth, (req, res) => {
    var table = <string>req.query.table;
    service.createCommentTable(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
})

router.get('/addColumn', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var field = <string>req.query.field;
    var type = <string>req.query.type
    var label = <boolean>req.query.label
    var myCubeField = <comment.MyCubeField>JSON.parse(req.query.myCubeField)
    service.addColumn(table, field, type, label, myCubeField).then((result) => {
        var constraint: string = ""
        var i: number = 0
        myCubeField.constraints.forEach((x) => {
            constraint = constraint + '"' + myCubeField.field + '"' + "='" + x.name + "'"
            if (i < myCubeField.constraints.length - 1) {
                constraint = constraint + " OR "
            }
            i = +1
        })
        service.addConstraint('mycube', table, myCubeField.field, constraint).then((result) => {
        })
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/deleteColumn', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var myCubeField = <comment.MyCubeField>JSON.parse(req.query.myCubeField)
    service.deleteColumn(table, myCubeField).then((result) => {
        res.send(result)
    }).catch((error) => {
        res.send(error)
    })
})

router.get('/moveColumn', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var myCubeField = <comment.MyCubeField>JSON.parse(req.query.myCubeField)
    service.moveColumn(table, myCubeField).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error)
    })
})

router.get('/deleteTable', token_auth, (req, res) => {
    var table = <string>req.query.table;

    service.deleteTable(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/deletecommenttable', token_auth, (req, res) => {
    var table = <string>req.query.table;

    service.deleteCommentTable(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/single', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.getsingle(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/anyone', token_auth, (req, res) => {
    var schema = <string>req.query.schema
    var table = <string>req.query.table;
    var field = <string>req.query.field;
    var value = <string>req.query.value;
    service.getanysingle(schema, table, field, value).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/getcomments', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.getcomments(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.get('/singlelog', token_auth, (req, res) => {
    var schema = <string>req.query.schema;
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.getSingleLog(schema, table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

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
router.post('/addanycommentwithoutgeom', token_auth, (req, res) => {
    var file = <File>req.body.file
    var comment = <App.MyCubeComment>req.body;
    service.addAnyCommentWithoutGeom(comment).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.post('/addimage', multer(multerConfig).single('photo'), function (req, res) {
    service.addImage(req).then((result) => {
        res.send(result);
    })
});

router.post('/addanyimage', multer(multerConfig).single('photo'), function (req, res) {
    service.addAnyImage(req).then((result) => {
        res.send(result)
    })
});

router.get('/getimage', (req, res) => {
    service.getImage(req.query.table, req.query.id).then((file) => {
        var fileContents = Buffer.from(file[0][0].file, "utf8");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file[0][0].filename);
        res.set('Content-Type', 'image/png');
        readStream.pipe(res);
    }).catch(err => {
        res.json({ msg: 'Error', detail: err });
    });
})

router.get('/getanyimage', (req, res) => {
    service.getAnyImage(req.query.schema, req.query.table, req.query.id).then((file) => {
        var fileContents = Buffer.from(file[0][0].file, "utf8");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file[0][0].filename);
        res.set('Content-Type', 'image/png');
        readStream.pipe(res);
    }).catch(err => {
        res.json({ msg: 'Error', detail: err });
    });
})

router.get('/deletecomment', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.deleteComment(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})
router.get('/addRecord', token_auth, (req, res) => {
    let table = <string>req.query.table;
    let geometry = <string>req.query.geometry;
    service.addRecord(table, geometry).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})
router.get('/addAnyRecord', token_auth, (req, res) => {
    let schema = <string>req.query.schema;
    let table = <string>req.query.table;
    let field = <string>req.query.field;
    let value = <string>req.query.value;
    service.addAnyRecord(schema, table, field, value).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
})
router.get('/fixGeometry', token_auth, (req, res) => {
    let table = <string>req.query.table;
    service.fixGeometry(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error)
    })
})
router.get('/deleteRecord', token_auth, (req, res) => {
    let table = <string>req.query.table;
    let id = <string>req.query.id;
    service.deleteRecord(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error)
    })
})
router.get('/deleteAnyRecord', token_auth, (req, res) => {
    let schema = <string>req.query.schema
    let table = <string>req.query.table;
    let id = <string>req.query.id;
    service.deleteAnyRecord(schema, table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error)
    })
})
router.put('/update', token_auth, (req, res) => {
    var table = <string>req.body.table;
    var id = <string>req.body.id;
    var field = <string>req.body.mycubefield.field;
    var type = <string>req.body.mycubefield.type;
    var value = <any>req.body.mycubefield.value;

    service.update(table, id, field, type, value).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.put('/updateAnyRecord', token_auth, (req, res) => {
    var schema = <string>req.body.schema
    var table = <string>req.body.table;
    var id = <string>req.body.id;
    var field = <string>req.body.datafield.field;
    var type = <string>req.body.datafield.type;
    var value = <any>req.body.datafield.value;
    service.updateAnyRecord(schema, table, id, field, type, value).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/setSRID', token_auth, (req, res) => {
    var table = <string>req.query.table;
    service.setSRID(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
})

router.get('/getOID', token_auth, (req, res) => {
    var table = <string>req.query.table;
    service.getOID(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getColumnCount', token_auth, (req, res) => {
    var table = <string>req.query.table;
    service.getColumnCount(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

    router.get('/getIsLabel', token_auth, (req, res) => {
        var oid = <number>req.query.oid;
        var field = <number>req.query.field;
        service.getIsLabel(oid, field).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        })
    })
})

export = router;