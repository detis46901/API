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
        console.log("API table=" + JSON.stringify(table));
        return db.query("CREATE TABLE mycube.t" + table + " (\n            ID    SERIAL PRIMARY KEY,\n            geom   geometry\n        );\n        ");
    };
    SQLService.prototype.createCommentTable = function (table) {
        return db.query("CREATE TABLE mycube.c" + table + " (\n            ID   SERIAL PRIMARY KEY,\n            userID integer,\n            comment text,\n            geom geometry,\n            featureID integer);\n            ");
    };
    SQLService.prototype.setSRID = function (table) {
        console.log(("SELECT UpdateGeometrySRID('mycube', 't" + table + "','geom',4326);"));
        return db.query("SELECT UpdateGeometrySRID('mycube', 't" + table + "','geom',4326);");
    };
    SQLService.prototype.addColumn = function (table, field, type) {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
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
        console.log("Deleting table = " + table + " and id = " + id + "';");
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';");
    };
    SQLService.prototype.getschema = function (table) {
        return db.query("SELECT column_name AS field, data_type as type FROM information_schema.columns WHERE table_schema = 'mycube' AND table_name = 't" + table + "'");
    };
    SQLService.prototype.getsingle = function (table, id) {
        return db.query("SELECT * FROM mycube.t" + table + " WHERE id='" + id + "';");
    };
    SQLService.prototype.getcomments = function (table, id) {
        return db.query("SELECT * FROM mycube.c" + table + " WHERE featureid='" + id + "';");
    };
    SQLService.prototype.addComment = function (table, id, comment, userid) {
        return db.query("INSERT INTO mycube.c" + table + " (userid, comment, featureid) VALUES (" + userid + ",'" + comment + "'," + id + ")");
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
    return SQLService;
}());
module.exports = SQLService;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/services/sql-service.js.map
