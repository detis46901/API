"use strict";
var dbConnection = require('../../../core/db-connection');
var db = dbConnection();
var SQLService = (function () {
    function SQLService() {
    }
    // getList(searchValue: string): Promise<any[]> {
    //     var findOptions: Sequelize.FindOptions = {
    //         order: [
    //             'lastName'
    //         ]
    //     };
    //     if (searchValue) {
    //         findOptions.where = {
    //             $or: [
    //                 { firstName: { $iLike: `%${searchValue}%` } },
    //                 { lastName: { $iLike: `%${searchValue}%` } },
    //                 { email: { $iLike: `%${searchValue}%` } },
    //             ]
    //         }
    //     }
    //     return UserModel.Model.findAll(findOptions);
    // }
    SQLService.prototype.get = function (table) {
        return db.query("SELECT * from mycube.t" + table);
        //return db.query('SELECT * FROM $1', { bind: [table], type: sequelize.queryTypes.SELECT})
    };
    SQLService.prototype.getsheets = function (table) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var responsehtml = "<html><body><table>";
            _this.getschema(table).then(function (schemaarray) {
                var schema = schemaarray[0];
                console.log(schema);
                _this.get(table).then(function (dataarray) {
                    var data = (dataarray[0]);
                    data.forEach(function (dataelement) {
                        responsehtml += "<tr>";
                        schema.forEach(function (schemaelement) {
                            //if (schemaelement['field'] == 'geom') {console.log(dataelement[schemaelement['field']]['type'])}
                            responsehtml += "<td>" + dataelement[schemaelement['field']] + "</td>";
                        });
                        responsehtml += "</tr>";
                    });
                    responsehtml += "</table></body></html>";
                    resolve(responsehtml);
                });
            });
        });
        return promise;
    };
    SQLService.prototype.create = function (table) {
        //     db.query(`CREATE SEQUENCE public."test3_ID_seq"
        //     INCREMENT 1
        //     MINVALUE 1
        //     MAXVALUE 9223372036854775807
        //     START 38
        //     CACHE 1;
        //   ALTER TABLE public."test3_ID_seq"
        //     OWNER TO geoadmin;
        //   `)
        return db.query("CREATE TABLE mycube.t" + table + " (\n            ID    SERIAL PRIMARY KEY,\n            geom   geometry\n        );\n        ");
    };
    SQLService.prototype.createCommentTable = function (table) {
        return db.query("CREATE TABLE mycube.c" + table + " (\n            ID   SERIAL PRIMARY KEY,\n            userID integer,\n            comment text,\n            geom geometry,\n            featureID integer,\n            createdAt timestamp with time zone default now());\n            ");
    };
    SQLService.prototype.setSRID = function (table) {
        return db.query("SELECT UpdateGeometrySRID('mycube', 't" + table + "','geom',4326);");
    };
    SQLService.prototype.addColumn = function (table, field, type, label) {
        db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
        if (label == true) {
            db.query("COMMENT ON COLUMN mycube.t" + table + '."' + field + "\" IS '" + field + "';");
        }
        return db.query("SELECT col_description(41644,3);");
    };
    SQLService.prototype.deleteTable = function (table) {
        return db.query('DROP TABLE mycube.t' + table);
    };
    SQLService.prototype.deleteCommentTable = function (table) {
        return db.query('DROP TABLE mycube.c' + table);
    };
    SQLService.prototype.addRecord = function (table, geometry) {
        return db.query("INSERT INTO mycube.t" + table + " (geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) RETURNING id;");
    };
    SQLService.prototype.deleteRecord = function (table, id) {
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';");
    };
    SQLService.prototype.getschema = function (table) {
        return db.query("SELECT column_name AS field, data_type as type FROM information_schema.columns WHERE table_schema = 'mycube' AND table_name = 't" + table + "'");
    };
    SQLService.prototype.getsingle = function (table, id) {
        return db.query("SELECT * FROM mycube.t" + table + " WHERE id='" + id + "';");
    };
    SQLService.prototype.getcomments = function (table, id) {
        return db.query("SELECT mycube.c" + table + '.*, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "';");
    };
    SQLService.prototype.addComment = function (table, featureID, comment, userid) {
        return db.query("INSERT INTO mycube.c" + table + '(userid, comment, featureid) VALUES (' + userid + ",'" + comment + "'," + featureID + ")");
    };
    SQLService.prototype.deleteComment = function (table, id) {
        return db.query("DELETE FROM mycube.c" + table + ' WHERE id=' + id + ";");
    };
    SQLService.prototype.update = function (table, id, field, type, value) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "text": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';");
            }
            case "boolean": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "date": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';");
            }
        }
    };
    SQLService.prototype.getOID = function (table) {
        return db.query("SELECT attrelid FROM pg_attribute WHERE attrelid = 'mycube.t" + table + "'::regclass;");
    };
    SQLService.prototype.getColumnCount = function (table) {
        return db.query("select count(column_name) from information_schema.columns where table_name='t" + table + "';");
        //return db.query("select count(*) from information_schema.columns where table_name='mycube.t" + table + "';")
    };
    SQLService.prototype.getIsLabel = function (oid, field) {
        return db.query("SELECT col_description(" + oid + "," + field + ");");
    };
    return SQLService;
}());
module.exports = SQLService;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/services/sql-service.js.map
