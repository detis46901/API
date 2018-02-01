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
        return db.query("SELECT jsonb_build_object(\n            'type',     'FeatureCollection',\n            'features', jsonb_agg(feature)\n        )\n        FROM (\n          SELECT jsonb_build_object(\n            'type',       'Feature',\n            'id',         id,\n            'geometry',   ST_AsGeoJSON(geom)::jsonb,\n            'properties', to_jsonb(row) - 'geom'\n          ) AS feature\n          FROM (SELECT * FROM mycube.t" + table + ") row) features;");
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
        return db.query("CREATE TABLE mycube.t" + table + " (\n            ID    timestamp PRIMARY KEY DEFAULT current_timestamp,\n            geom   geometry\n        );");
    };
    SQLService.prototype.addColumn = function (table, field, type) {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
    };
    SQLService.prototype.deleteTable = function (table) {
        return db.query('DROP TABLE mycube.t' + table);
    };
    SQLService.prototype.updateGeometry = function (table, geometry, id) {
        //return db.query("UPDATE mycube.t" + table + ' SET "1" = true;')
        return db.query("UPDATE mycube.t" + table + " SET geom = (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) WHERE id='" + id + "';");
    };
    return SQLService;
}());
module.exports = SQLService;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/services/geojson-service.js.map
