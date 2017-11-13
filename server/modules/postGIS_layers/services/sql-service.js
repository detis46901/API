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
        return db.query("CREATE TABLE mycube.t" + table + " (\n            ID    timestamp PRIMARY KEY DEFAULT current_timestamp,\n            geom   geometry\n        );");
    };
    SQLService.prototype.addColumn = function (table, field, type) {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
    };
    SQLService.prototype.deleteTable = function (table) {
        return db.query('DROP TABLE mycube.t' + table);
    };
    SQLService.prototype.getschema = function (table) {
        return db.query("SELECT column_name AS field, data_type as type FROM information_schema.columns WHERE table_schema = 'mycube' AND table_name = 't" + table + "'");
    };
    SQLService.prototype.getsingle = function (table, id) {
        return db.query("SELECT * FROM mycube.t" + table + " WHERE id='" + id + "';");
    };
    SQLService.prototype.update = function (table, id, field, type, value) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';");
            }
            case "text": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';");
            }
        }
    };
    return SQLService;
}());
module.exports = SQLService;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/services/sql-service.js.map
