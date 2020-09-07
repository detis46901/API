"use strict";
var dbConnection = require('../../../core/db-connection');
var db = dbConnection();
var SQLService = (function () {
    function SQLService() {
    }
    SQLService.prototype.get = function (table) {
        return db.query("SELECT jsonb_build_object(\n            'type',     'FeatureCollection',\n            'features', jsonb_agg(feature)\n        )\n        FROM (\n          SELECT jsonb_build_object(\n            'type',       'Feature',\n            'id',         id,\n            'geometry',   ST_AsGeoJSON(geom)::jsonb,\n            'properties', to_jsonb(row) - 'geom'\n          ) AS feature\n          FROM (SELECT * FROM mycube.t" + table + ") row) features;");
    };
    SQLService.prototype.getSome = function (table, where) {
        return db.query("SELECT jsonb_build_object(\n            'type',     'FeatureCollection',\n            'features', jsonb_agg(feature)\n        )\n        FROM (\n          SELECT jsonb_build_object(\n            'type',       'Feature',\n            'id',         id,\n            'geometry',   ST_AsGeoJSON(geom)::jsonb,\n            'properties', to_jsonb(row) - 'geom'\n          ) AS feature\n          FROM (SELECT * FROM mycube.t" + table + " WHERE " + where + " ORDER BY id) row) features;");
    };
    SQLService.prototype.create = function (table) {
        return db.query("CREATE TABLE mycube.t" + table + " (\n            ID    timestamp PRIMARY KEY DEFAULT current_timestamp,\n            geom   geometry\n        );");
    };
    SQLService.prototype.addColumn = function (table, field, type) {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type);
    };
    SQLService.prototype.deleteTable = function (table) {
        return db.query('DROP TABLE mycube.t' + table);
    };
    SQLService.prototype.updateGeometry = function (table, geometry, id) {
        return db.query("UPDATE mycube.t" + table + " SET geom = (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) WHERE id='" + id + "';");
    };
    return SQLService;
}());
module.exports = SQLService;

//# sourceMappingURL=../../../source-maps/modules/postGIS_layers/services/geojson-service.js.map
