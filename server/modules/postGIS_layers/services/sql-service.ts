import dbConnection = require('../../../core/db-connection');
import { MyCubeField } from '../models/postGIS_layers.model';
var db = dbConnection();


class SQLService {

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

    get(schema: string, table: string): Promise<any> {
        if (schema == 'mycube') {
            return db.query("SELECT *,ST_Length(ST_Transform(geom,2965)), ST_Area(ST_Transform(geom,2965)) from " + schema + "." + table + ' ORDER BY id')
        }
        else {
            return db.query("SELECT * from " + schema + "." + table + ' ORDER BY id')
        }
        //return db.query('SELECT * FROM $1', { bind: [table], type: sequelize.queryTypes.SELECT})
    }

    getsheets(schema: string, table: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let responsehtml: string = "<html><body><table>"
            this.getschema(schema, table).then((schemaarray) => {
                let schema2 = schemaarray[0]
                //header information
                responsehtml += "<tr>"
                schema2.forEach(schemaelement => {
                    if (schemaelement['field'] != 'geom') {
                        responsehtml += "<th>" + [schemaelement['field']] + "</th>"
                    }
                });
                if (schema == 'mycube') {
                    responsehtml += "<th>Length (ft)</th>"
                    responsehtml += "<th>Area (sqft)</th>"
                }
                responsehtml += "</tr>"

                this.get(schema, table).then((dataarray) => {
                    let data = (dataarray[0])
                    data.forEach(dataelement => {
                        responsehtml += "<tr>"
                        schema2.forEach(schemaelement => {
                            if (schemaelement['field'] != 'geom') {
                                if (!dataelement[schemaelement['field']] || dataelement[schemaelement['field']] == "null") { dataelement[schemaelement['field']] = "" }
                                responsehtml += "<td>" + dataelement[schemaelement['field']] + "</td>"
                            }
                        });
                        if (schema == 'mycube') {
                            responsehtml += "<td>" + dataelement['st_length'] + '</td>'
                            responsehtml += "<td>" + dataelement['st_area'] + '</td>'
                        }
                        responsehtml += "</tr>"
                    });
                    responsehtml += "</table></body></html>"
                    resolve(responsehtml)
                })
            })
        })
        return promise
    }

    getlength(table: string, id: number): Promise<any> {
        return db.query('SELECT ST_Length(ST_Transform(geom,2965)) from mycube.t' + table + ' WHERE id=' + id + ';')
    }

    create(table: string): Promise<any> {
        //     db.query(`CREATE SEQUENCE public."test3_ID_seq"
        //     INCREMENT 1
        //     MINVALUE 1
        //     MAXVALUE 9223372036854775807
        //     START 38
        //     CACHE 1;
        //   ALTER TABLE public."test3_ID_seq"
        //     OWNER TO geoadmin;
        //   `)
        return db.query(`CREATE TABLE mycube.t` + table + ` (
                ID    SERIAL PRIMARY KEY,
                geom   geometry
            );
        `)
    }

    getConstraints(schema: string, table: string): Promise<any> {
        return db.query(`SELECT con.*
        FROM pg_catalog.pg_constraint con
             INNER JOIN pg_catalog.pg_class rel
                        ON rel.oid = con.conrelid
             INNER JOIN pg_catalog.pg_namespace nsp
                        ON nsp.oid = connamespace
        WHERE nsp.nspname = '` + schema + `'
              AND rel.relname = '` + table + `';`)
    }

    createCommentTable(table: string): Promise<any> {
        return db.query(`CREATE TABLE mycube.c` + table + ` (
            ID   SERIAL PRIMARY KEY,
            userID integer,
            comment text,
            geom geometry,
            featureChange boolean,
            filename text,
            file bytea,
            auto boolean,
            featureID integer,
            createdAt timestamp with time zone default now());
            `)
    }

    setSRID(table): Promise<any> {
        return db.query(`SELECT UpdateGeometrySRID('mycube', 't` + table + `','geom',4326);`)
    }

    addColumn(table: string, field: string, type: string, label: boolean, myCubeField: MyCubeField): Promise<any> {
        db.query('ALTER TABLE mycube.t' + table + ' ADD "' + myCubeField.field + '" ' + myCubeField.type)
        //if (label == true) { db.query(`COMMENT ON COLUMN mycube.t` + table + '."' + field + `" IS '` + field + `';`) }
        return db.query("SELECT col_description(41644,3);")

    }

    deleteColumn(table: string, myCubeField: MyCubeField): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' DROP "' + myCubeField.field + '"')
    }

    moveColumn(table: string, myCubeField: MyCubeField): Promise<any> {
        let rnd = Math.trunc(Math.random() * 100)
        let promise = new Promise((resolve, reject) => {
            this.mC1(table, myCubeField, rnd).then(() => {
                this.mC2(table, myCubeField, rnd).then(() => {
                    this.mC3(table, myCubeField).then(() => {
                        this.mc4(table, myCubeField, rnd).then(() => {resolve()})
                    }
                    )
                }
                )
            }
            )
        })
        return promise
    }

    mC1(table: string, myCubeField: MyCubeField, rnd: number): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD layer' + rnd + ' ' + myCubeField.type)
    }

    mC2(table: string, myCubeField: MyCubeField, rnd: number): Promise<any> {
        return db.query('UPDATE mycube.t' + table + ' SET layer' + rnd + ' = "' + myCubeField.field + '"')
    }

    mC3(table: string, myCubeField: MyCubeField): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' DROP "' + myCubeField.field + '"')
    }

    mc4(table: string, myCubeField: MyCubeField, rnd: number): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' RENAME layer' + rnd + ' TO "' + myCubeField.field + '"')
    }

    updateConstraint(schema: string, table: string, myCubeField: MyCubeField): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            var constraint: string = ""
            var i: number = 1
            // this.deleteConstraint(schema, table, myCubeField.field).then(() => {
            if (myCubeField.constraints) {
                myCubeField.constraints.forEach((x) => {
                    if (myCubeField.type == 'integer' || myCubeField.type == 'double precision') { constraint = constraint + '"' + myCubeField.field + '"' + "= " + x.name }
                    else { constraint = constraint + '"' + myCubeField.field + '"' + "='" + x.name + "'" }
                    if (i < myCubeField.constraints.length) {
                        constraint = constraint + " OR "
                    }
                    i = i + 1
                })
                if (constraint) {
                    this.deleteConstraint(schema, table, myCubeField.field).then((result) => {
                        this.addConstraint(schema, table, myCubeField.field, constraint).then((result) => {
                            resolve()
                        })
                    }).catch((error) => {
                        this.addConstraint(schema, table, myCubeField.field, constraint).then((result) => {resolve()})
                    })
                }
                else { resolve() }

            }
        })
        return promise
    }

    addConstraint(schema: string, table: string, field: string, constraint: string): Promise<any> {
        //this can fail at times if there is already a constraint
        return db.query('ALTER TABLE ' + schema + '.t' + table + ' ADD CONSTRAINT "' + field + '_types" CHECK (' + constraint + ');')
    }

    deleteConstraint(schema: string, table: string, field: string): Promise<any> {
        return db.query('ALTER TABLE ' + schema + '.t' + table + ' DROP CONSTRAINT ' + field + '_types')
    }

    deleteTable(table: string): Promise<any> {
        return db.query('DROP TABLE mycube.t' + table)
    }

    deleteCommentTable(table: string): Promise<any> {
        return db.query('DROP TABLE mycube.c' + table)
    }

    addRecord(table: string, geometry: string): Promise<any> {
        return db.query("INSERT INTO mycube.t" + table + " (geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) RETURNING id;")
    }
    addAnyRecord(schema, table, field, value) {
        return db.query("INSERT INTO " + schema + "." + table + ' ("' + field + '") VALUES (' + value + ") RETURNING id;")
    }

    fixGeometry(table: string) {
        return db.query("ALTER TABLE mycube.t" + table + " ALTER COLUMN geom type geometry(Geometry, 4326);")
    }


    deleteRecord(table: string, id: string): Promise<any> {
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';")
    }

    deleteAnyRecord(schema: string, table: string, id: string): Promise<any> {
        return db.query('DELETE FROM ' + schema + '."' + table + '" WHERE id' + " = '" + id + "';")
    }

    getschema(schema: string, table: string): Promise<any> {
        return db.query(`SELECT cols.column_name AS field, cols.data_type as type,
        pg_catalog.col_description(c.oid, cols.ordinal_position::int) as description
        FROM pg_catalog.pg_class c, information_schema.columns cols
        WHERE cols.table_schema = '` + schema + `' AND cols.table_name = '` + table + "' AND cols.table_name = c.relname")
    }
    getsingle(table: string, id: string): Promise<any> {
        return db.query("SELECT * FROM " + table + " WHERE id='" + id + "';")
    }

    getanysingle(schema: string, table: string, field: string, value: string): Promise<any> {
        return db.query("SELECT * FROM " + schema + '."' + table + `" WHERE "` + field + `" = ` + value)
    }

    getcomments(table: string, id: string): Promise<any> {
        return db.query('SELECT id, userid, comment, geom, filename, auto, featureid, createdat, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "' ORDER BY id DESC;")
        //return db.query("SELECT mycube.c" + table + '.*, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "';")
    }
    getSingleLog(schema: string, table: string, id: string): Promise<any> {
        return db.query('SELECT ' + schema + '."' + table + '".*, users."firstName", users."lastName" FROM ' + schema + '.' + table + "  INNER JOIN users ON " + schema + "." + table + '.userid = users."ID" WHERE ' + schema + '.' + table + ".featureid='" + id + "' ORDER BY id DESC;")
    }

    addAnyCommentWithoutGeom(comment: App.MyCubeComment): Promise<any> {
        if (comment.geom) {
            let ntext: RegExp = /'/g
            try { comment.comment = comment.comment.replace(ntext, "''") }
            catch (error) { }
            return db.query("INSERT INTO " + comment.schema + '."' + comment.logTable + '" (userid, comment, geom, featureid, auto) VALUES (' + comment.userid + ",'" + comment.comment + "',(ST_SetSRID(ST_GeomFromGeoJSON('" + JSON.stringify(comment.geom['geometry']) + "'),4326))," + comment.featureid + "," + comment.auto + ")")
        }
        else {
            return db.query("INSERT INTO " + comment.schema + '."' + comment.logTable + '" (userid, comment, featureid, auto) VALUES (' + comment.userid + ",'" + comment.comment + "','" + comment.featureid + "'," + comment.auto + ") RETURNING id;")
        }
    }

    addImage(comment: any): Promise<any> {
        return db.query("UPDATE " + comment['body']['schema'] + '."' + comment['body']['table'] + '"' + " SET file = ?, filename = ? where id ='" + comment['body']['id'] + "'", { replacements: [comment.file.buffer, comment.file.originalname] })
    }
    addAnyImage(comment: any): Promise<any> {
        return db.query('UPDATE ' + comment['body']['table'] + " SET file = ?, filename = ? where id ='" + comment['body']['id'] + "'", { replacements: [comment.file.buffer, comment.file.originalname] })
    }
    getImage(table, id): Promise<any> {
        return db.query("SELECT filename, file FROM mycube.c" + table + " WHERE id=" + id)
    }
    getAnyImage(schema, table, id): Promise<any> {
        return db.query('SELECT filename, file FROM "' + schema + '"."' + table + '" WHERE id=' + id)
    }
    deleteComment(table: string, id: string): Promise<any> {
        return db.query("DELETE FROM mycube.c" + table + ' WHERE id=' + id + ";")
    }
    update(table: string, id: string, field: string, type: string, value: any) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "double precision": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "text": {
                if (value == null) {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = NULL WHERE "' + "id='" + id + "';")
                }
                else {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';")
                }
            }
            case "boolean": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "date": {
                if (value) {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';")
                }
                else {
                    return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "null WHERE id='" + id + "';")
                }
            }
        }
    }
    updateAnyRecord(schema: string, table: string, id: string, field: string, type: string, value: any) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "double precision": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "text": {
                if (value == null) {
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = NULL WHERE "' + "id='" + id + "';")
                }
                else {
                    let ntext: RegExp = /'/g
                    try { value = value.replace(ntext, "''") }
                    catch (error) { }
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';")
                }
            }
            case "boolean": {
                return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "date": {
                if (value) {
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';")
                }
                else {
                    return db.query("UPDATE " + schema + "." + table + ' SET "' + field + '" = ' + "null WHERE id='" + id + "';")
                }
            }
        }
    }
    getOID(table: string) {
        return db.query("SELECT attrelid FROM pg_attribute WHERE attrelid = 'mycube.t" + table + "'::regclass;")
    }

    getColumnCount(table: string) {
        return db.query("select count(column_name) from information_schema.columns where table_name='t" + table + "';")
        //return db.query("select count(*) from information_schema.columns where table_name='mycube.t" + table + "';")
    }

    getIsLabel(oid: number, field: number) {
        return db.query("SELECT col_description(" + oid + "," + field + ");")
    }
}

export = SQLService;