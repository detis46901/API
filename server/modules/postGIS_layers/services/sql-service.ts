import Sequelize = require('sequelize');
import dbConnection = require('../../../core/db-connection');

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
    //             $or: [
    //                 { firstName: { $iLike: `%${searchValue}%` } },
    //                 { lastName: { $iLike: `%${searchValue}%` } },
    //                 { email: { $iLike: `%${searchValue}%` } },
    //             ]
    //         }
    //     }
        
    //     return UserModel.Model.findAll(findOptions);
    // }

    get(table: string): Promise<any> {
        return db.query("SELECT *,ST_Length(ST_Transform(geom,2965)), ST_Area(ST_Transform(geom,2965)) from mycube.t" + table)
        //return db.query('SELECT * FROM $1', { bind: [table], type: sequelize.queryTypes.SELECT})
    }

    getsheets(table: string): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let responsehtml: string = "<html><body><table>"
            this.getschema(table).then((schemaarray) => {
                let schema = schemaarray[0]
                //header information
                responsehtml += "<tr>"
                schema.forEach(schemaelement => {
                    responsehtml += "<th>" + [schemaelement['field']] + "</th>"
                });
                responsehtml += "<th>Length (ft)</th>"
                responsehtml += "<th>Area (sqft)</th>"
                responsehtml += "</tr>"

                this.get(table).then((dataarray) => {
                    let data = (dataarray[0])
                    console.log(data)
                    data.forEach(dataelement => {
                        responsehtml += "<tr>"
                        schema.forEach(schemaelement => {
                            // if (schemaelement['field'] == 'geom') {
                            //     console.log(dataelement[schemaelement['field']]['type'])
                            //     if (dataelement[schemaelement['field']]['type'] == "LineString") {
                            //         console.log(dataelement['id'])

                            //         this.getlength(table, dataelement['id']).then((result) => {responsehtml += result[0][0]['st_length']})
                            //     } 
                            // }
                            responsehtml += "<td>" + dataelement[schemaelement['field']] + "</td>"
                        });
                        responsehtml += "<td>" + dataelement['st_length'] + '</td>'
                        responsehtml += "<td>" + dataelement['st_area'] + '</td>'
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

    createCommentTable(table: string): Promise<any> {
        return db.query(`CREATE TABLE mycube.c` + table + ` (
            ID   SERIAL PRIMARY KEY,
            userID integer,
            comment text,
            geom geometry,
            featureID integer,
            createdAt timestamp with time zone default now());
            `)
    }

    setSRID(table): Promise<any> {
        return db.query(`SELECT UpdateGeometrySRID('mycube', 't` + table + `','geom',4326);`)
    }

    addColumn(table: string, field: string, type: string, label: boolean): Promise<any> {
        db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type)
        if (label == true) {db.query(`COMMENT ON COLUMN mycube.t` + table + '."' + field + `" IS '` + field + `';`)}        
        return  db.query("SELECT col_description(41644,3);")
        
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

    deleteRecord(table: string, id: string): Promise<any> {
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';")
    }
    
    getschema(table:string): Promise<any> {
        return db.query("SELECT column_name AS field, data_type as type FROM information_schema.columns WHERE table_schema = 'mycube' AND table_name = 't" + table + "'")
    }
    getsingle(table:string, id:string): Promise<any> {
        return db.query("SELECT * FROM mycube.t" + table + " WHERE id='" + id + "';")
    }
    getcomments(table:string, id:string): Promise<any> {
        return db.query("SELECT mycube.c" + table + '.*, users."firstName", users."lastName" FROM mycube.c' + table + "  INNER JOIN users ON mycube.c" + table + '.userid = users."ID" WHERE mycube.c' + table + ".featureid='" + id + "';")
    }
    addComment(table:string, featureID:string, comment:string, userid: number): Promise<any> {
        return db.query("INSERT INTO mycube.c" + table + '(userid, comment, featureid) VALUES (' + userid + ",'" + comment + "'," + featureID + ")")
    }
    deleteComment(table:string, id:string): Promise<any> {
        return db.query("DELETE FROM mycube.c" + table + ' WHERE id=' + id + ";")
    }
    update(table: string, id: string, field: string, type: string, value: any) {
        switch (type) {
            case "integer": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "text": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE " + "id='" + id + "';") 
            }
            case "boolean": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + value + " WHERE id='" + id + "';")
            }
            case "date": {
                return db.query("UPDATE mycube.t" + table + ' SET "' + field + '" = ' + "'" + value + "' WHERE id='" + id + "';")
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

    getIsLabel(oid: number, field:number) {
        return db.query("SELECT col_description(" + oid + "," + field + ");")
    }
}

export = SQLService;