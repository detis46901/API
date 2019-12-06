import SQLService = require('../services/sql-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import comment = require ('../models/postGIS_layers.model')
import { error } from 'util';
var stream = require('stream');

var express = require('express');
var multer  = require('multer');const multerConfig = {
    storage: multer.memoryStorage()
    // storage: multer.diskStorage({
    //  //Setup where the user's file will go
    //  destination: function(req, file, next){
    //    next(null, './public/photo-storage');
    //    },   
        
    //     //Then give the file a unique name
    //     filename: function(req, file, next){
    //         console.log(file);
    //         const ext = file.mimetype.split('/')[1];
    //         next(null, file.fieldname + '-' + Date.now() + '.'+ext);
    //       }
    //     }),   
        
    //     //A means of ensuring only images are uploaded. 
    //     fileFilter: function(req, file, next){
    //           if(!file){
    //             next();
    //           }
    //         const image = file.mimetype.startsWith('image/');
    //         if(image){
    //           console.log('photo uploaded');
    //           next(null, true);
    //         }else{
    //           console.log("file not supported");
              
    //           //TODO:  A better message response to user on failure.
    //           return next();
    //         }
    //     }
      };
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
    var schema = <string>req.query.schema;
    console.log(table)
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
    //console.log(comment)
    var table = <number>comment.table;
    service.addCommentWithGeom(comment).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})
router.post('/addcommentwithoutgeom', token_auth, (req, res) => {
    var file = <File>req.body.file
    //console.log(file)
    var comment= <App.MyCubeComment>req.body;
    //console.log(comment)
    var table = <number>comment.table;
    service.addCommentWithoutGeom(comment).then((result) => {
        console.log(result)
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
})
router.post('/addimage', multer(multerConfig).single('photo'),function(req,res){
    console.log('addImage')
    //console.log(req)
    service.addImage(req)
    //res.send(res);
 });
 
router.get('/getimage', (req, res) => {
    service.getImage(req.query.table, req.query.id).then((file) => {
        console.log(file[0][0].file)
        console.log(Buffer.isBuffer(file[0][0].file))
        var fileContents = Buffer.from(file[0][0].file, "utf8");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file[0][0].filename);
		res.set('Content-Type', 'image/png');
		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
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

router.put('/update', token_auth, (req, res) => {
    //console.log(req)
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