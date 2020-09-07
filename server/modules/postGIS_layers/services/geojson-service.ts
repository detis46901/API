import dbConnection = require('../../../core/db-connection');

var db = dbConnection();

class SQLService {

    get(table: string): Promise<any> {
        return db.query(`SELECT jsonb_build_object(
            'type',     'FeatureCollection',
            'features', jsonb_agg(feature)
        )
        FROM (
          SELECT jsonb_build_object(
            'type',       'Feature',
            'id',         id,
            'geometry',   ST_AsGeoJSON(geom)::jsonb,
            'properties', to_jsonb(row) - 'geom'
          ) AS feature
          FROM (SELECT * FROM mycube.t` + table + `) row) features;`)
    }

    getSome(table: string, where: string): Promise<any> {
        return db.query(`SELECT jsonb_build_object(
            'type',     'FeatureCollection',
            'features', jsonb_agg(feature)
        )
        FROM (
          SELECT jsonb_build_object(
            'type',       'Feature',
            'id',         id,
            'geometry',   ST_AsGeoJSON(geom)::jsonb,
            'properties', to_jsonb(row) - 'geom'
          ) AS feature
          FROM (SELECT * FROM mycube.t` + table + ` WHERE ` + where + ` ORDER BY id) row) features;`)
    }

    create(table: string): Promise<any> {
        return db.query(`CREATE TABLE mycube.t` + table + ` (
            ID    timestamp PRIMARY KEY DEFAULT current_timestamp,
            geom   geometry
        );`)
    }

    addColumn(table: string, field: string, type: string): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type)
    }

    deleteTable(table: string): Promise<any> {
        return db.query('DROP TABLE mycube.t' + table)
    }

    updateGeometry(table: string, geometry: string, id: string): Promise<any> {
        return db.query("UPDATE mycube.t" + table + " SET geom = (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) WHERE id='" + id + "';")
    }
}

export = SQLService;