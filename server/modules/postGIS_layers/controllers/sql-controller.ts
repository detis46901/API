import SQLService = require('../services/sql-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import comment = require ('../models/postGIS_layers.model')
import { error } from 'util';

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

router.get('/all', token_auth, (req, res) => {

    var table = <string>req.query.table;

    service.get(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });

});

router.get('/getsheets', token_auth, (req, res) => {

    var table = <string>req.query.table;

    service.getsheets(table).then((result) => {
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

    service.addColumn(table, field, type, label).then((result) => {
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

router.get('/deletecommenttable', token_auth, (req, res) => {
    var table = <string>req.query.table;

    service.deleteCommentTable(table).then((result) => {
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

router.get('/getcomments', token_auth, (req, res) => {
    var table = <string>req.query.table;
    var id = <string>req.query.id;
    service.getcomments(table, id).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})

router.post('/addcommentwithgeom', token_auth, (req, res) => {
    var comment= <App.MyCubeComment>req.body;
    console.log(comment)
    var table = <number>comment.table;
    service.addCommentWithGeom(comment).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})
router.post('/addcommentwithoutgeom', token_auth, (req, res) => {
    var comment= <App.MyCubeComment>req.body;
    console.log(comment)
    var table = <number>comment.table;
    service.addCommentWithoutGeom(comment).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
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

router.get('/setSRID', token_auth, (req, res) => {
    var table = <string>req.query.table;
    service.setSRID(table).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    })
})

// router.delete('/delete', (req, res) => {

//     var ID = <number>req.query.ID;
//     console.log (ID);
//     service.delete(ID).then((result) => {
//         res.send(result);
//     }).catch((error) => {
//         res.send(error);
//     });

//});
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