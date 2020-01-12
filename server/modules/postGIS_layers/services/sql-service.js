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
    //             [Sequelize.Op.or]: [
    //                 { firstName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
    //                 { lastName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
    //                 { email: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
    //             ]
    //         }
    //     }
    //     return UserModel.Model.findAll(findOptions);
    // }
    SQLService.prototype.get = function (schema, table) {
        if (schema == 'mycube') {
            return db.query("SELECT *,ST_Length(ST_Transform(geom,2965)), ST_Area(ST_Transform(geom,2965)) from " + schema + "." + table + ' ORDER BY id');
        }
        else {
            return db.query("SELECT * from " + schema + "." + table + ' ORDER BY id');
        }
        //return db.query('SELECT * FROM $1', { bind: [table], type: sequelize.queryTypes.SELECT})
    };
    SQLService.prototype.getsheets = function (schema, table) {
        var _this = this;
        console.log(schema);
        var promise = new Promise(function (resolve, reject) {
            var responsehtml = "<html><body><table>";
            _this.getschema(schema, table).then(function (schemaarray) {
                var schema2 = schemaarray[0];
                console.log(schema2);
                //header information
                responsehtml += "<tr>";
                schema2.forEach(function (schemaelement) {
                    if (schemaelement['field'] != 'geom') {
                        responsehtml += "<th>" + [schemaelement['field']] + "</th>";
                    }
                });
                if (schema == 'mycube') {
                    responsehtml += "<th>Length (ft)</th>";
                    responsehtml += "<th>Area (sqft)</th>";
                }
                responsehtml += "</tr>";
                _this.get(schema, table).then(function (dataarray) {
                    var data = (dataarray[0]);
                    data.forEach(function (dataelement) {
                        responsehtml += "<tr>";
                        schema2.forEach(function (schemaelement) {
                            if (schemaelement['field'] != 'geom') {
                                if (!dataelement[schemaelement['field']] || dataelement[schemaelement['field']] == "null") {
                                    dataelement[schemaelement['field']] = "";
                                }
                                responsehtml += "<td>" + dataelement[schemaelement['field']] + "</td>";
                            }
                        });
                        if (schema == 'mycube') {
                            responsehtml += "<td>" + dataelement['st_length'] + '</td>';
                            responsehtml += "<td>" + dataelement['st_area'] + '</td>';
                        }
                        responsehtml += "</tr>";
                    });
                    responsehtml += "</table></body></html>";
                    resolve(responsehtml);
                });
            });
        });
        return promise;
    };
    SQLService.prototype.getlength = function (table, id) {
        return db.query('SELECT ST_Length(ST_Transform(geom,2965)) from mycube.t' + table + ' WHERE id=' + id + ';');
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
        return db.query("CREATE TABLE mycube.t" + table + " (\n                ID    SERIAL PRIMARY KEY,\n                geom   geometry\n            );\n        ");
    };
    SQLService.prototype.getConstraints = function (schema, table) {
        return db.query("SELECT con.*\n        FROM pg_catalog.pg_constraint con\n             INNER JOIN pg_catalog.pg_class rel\n                        ON rel.oid = con.conrelid\n             INNER JOIN pg_catalog.pg_namespace nsp\n                        ON nsp.oid = connamespace\n        WHERE nsp.nspname = '" + schema + "'\n              AND rel.relname = '" + table + "';");
    };
    SQLService.prototype.createCommentTable = function (table) {
        return db.query("CREATE TABLE mycube.c" + table + " (\n            ID   SERIAL PRIMARY KEY,\n            userID integer,\n            comment text,\n            geom geometry,\n            featureChange boolean,\n            filename text,\n            file bytea,\n            auto boolean,\n            featureID integer,\n            createdAt timestamp with time zone default now());\n            ");
    };
    SQLService.prototype.setSRID = function (table) {
        return db.query("SELECT UpdateGeometrySRID('mycube', 't" + table + "','geom',4326);");
    };
    SQLService.prototype.addColumn = function (table, field, type, label) {
        db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
        //if (label == true) { db.query(`COMMENT ON COLUMN mycube.t` + table + '."' + field + `" IS '` + field + `';`) }
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
    SQLService.prototype.addAnyRecord = function (schema, table, field, value) {
        return db.query("INSERT INTO " + schema + "." + table + ' ("' + field + '") VALUES (' + value + ") RETURNING id;");
    };
    SQLService.prototype.fixGeometry = function (table) {
        return db.query("ALTER TABLE mycube.t" + table + " ALTER COLUMN geom type geometry(Geometry, 4326);");
    };
    SQLService.prototype.deleteRecord = function (table, id) {
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';");
    };
    SQLService.prototype.deleteAnyRecord = function (schema, table, id) {
        return db.query("DELETE FROM " + schema + "." + table + " WHERE id = '" + id + "';");
    };
    SQLService.prototype.getschema = function (schema, table) {
        console.log(table);
        return db.query("SELECT cols.column_name AS field, cols.data_type as type,\n        pg_catalog.col_description(c.oid, cols.ordinal_position::int) as description\n        FROM pg_catalog.pg_class c, information_schema.columns cols\n        WHERE cols.table_schema = '" + schema + "' AND cols.table_name = '" + table + "' AND cols.table_name = c.relname");
    };
    SQLService.prototype.getsingle = function (table, id) {
        return db.query("SELECT * FROM " + table + " WHERE id='" + id + "';");
    };
    SQLService.prototype.getanysingle = function (table, field, value) {
        return db.query("SELECT * FROM " + table + " WHERE \"" + field + "\" = " + value);
    };
    SQLService.prototype.getcomments = function (table, id) {
        return db.query('SELECT id, userid, comment, geom, filename, auto, featureid, createdat, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "';");
        //return db.query("SELECT mycube.c" + table + '.*, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "';")
    };
    SQLService.prototype.addCommentWithGeom = function (comment) {
        return db.query("INSERT INTO mycube.c" + comment.table + '(userid, comment, geom, featureid, auto) VALUES (' + comment.userID + ",'" + comment.comment + "',(ST_SetSRID(ST_GeomFromGeoJSON('" + JSON.stringify(comment.geom['geometry']) + "'),4326))," + comment.featureID + "," + comment.auto + ")");
    };
    SQLService.prototype.addCommentWithoutGeom = function (comment) {
        return db.query("INSERT INTO mycube.c" + comment.table + '(userid, comment, featureid, auto) VALUES (' + comment.userID + ",'" + comment.comment + "','" + comment.featureID + "'," + comment.auto + ") RETURNING id;");
    };
    SQLService.prototype.addImage = function (comment) {
        //console.log('In addImage')
        //console.log(comment.file.originalname)
        //console.log(comment.file.buffer)
        return db.query("UPDATE mycube.c" + comment['body']['table'] + " SET file = ?, filename = ? where id ='" + comment['body']['id'] + "'", { replacements: [comment.file.buffer, comment.file.originalname] });
        //return db.query("INSERT INTO mycube.c92 (userid, comment, featureid, file, auto) VALUES (1,'comment','525', ? ,false)", {replacements: [comment.file.buffer]})
    };
    SQLService.prototype.getImage = function (table, id) {
        return db.query("SELECT filename, file FROM mycube.c" + table + " WHERE id=" + id);
    };
    SQLService.prototype.deleteComment = function (table, id) {
        return db.query("DELETE FROM mycube.c" + table + ' WHERE id=' + id + ";");
    };
    SQLService.prototype.update = function (table, id, field, type, value) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "double precision": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "text": {
                if (value == null) {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = NULL WHERE "' + "id='" + id + "';");
                }
                else {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';");
                }
            }
            case "boolean": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "date": {
                if (value) {
                    //console.log('is not null')
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';");
                }
                else {
                    //console.log("is null")
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "null WHERE id='" + id + "';");
                }
            }
        }
    };
    SQLService.prototype.updateAnyRecord = function (schema, table, id, field, type, value) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "double precision": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "text": {
                if (value == null) {
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = NULL WHERE "' + "id='" + id + "';");
                }
                else {
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';");
                }
            }
            case "boolean": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "date": {
                if (value) {
                    //console.log('is not null')
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';");
                }
                else {
                    //console.log("is null")
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "null WHERE id='" + id + "';");
                }
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
