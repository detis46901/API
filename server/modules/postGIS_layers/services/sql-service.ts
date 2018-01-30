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
        return db.query("SELECT * from mycube.t" + table)
        //return db.query('SELECT * FROM $1', { bind: [table], type: sequelize.queryTypes.SELECT})
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
        console.log("API table=" + JSON.stringify(table))
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
            featureID integer);
            `)
    }

    setSRID(table): Promise<any> {
        console.log((`SELECT UpdateGeometrySRID('mycube', 't` + table + `','geom',4326);`))
        return db.query(`SELECT UpdateGeometrySRID('mycube', 't` + table + `','geom',4326);`)
    }

    addColumn(table: string, field: string, type: string): Promise<any> {
        return db.query('ALTER TABLE mycube.t' + table + ' ADD "' + field + '" ' + type)
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
        console.log ("Deleting table = " + table + " and id = " + id +"';" )
        return db.query("DELETE FROM mycube.t" + table + " WHERE id = '" + id + "';")
    }
    
    getschema(table:string): Promise<any> {
        return db.query("SELECT column_name AS field, data_type as type FROM information_schema.columns WHERE table_schema = 'mycube' AND table_name = 't" + table + "'")
    }
    getsingle(table:string, id:string): Promise<any> {
        return db.query("SELECT * FROM mycube.t" + table + " WHERE id='" + id + "';")
    }
    getcomments(table:string, id:string): Promise<any> {
        return db.query("SELECT * FROM mycube.c" + table + " WHERE featureid='" + id + "';")
    }
    addComment(table:string, id:string, comment:string, userid: number): Promise<any> {
        return db.query("INSERT INTO mycube.c" + table + " (userid, comment, featureid) VALUES (" + userid + ",'" + comment + "'," + id + ")")
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
//     create(request: App.User): Promise<UserModel.UserInstance> {
//         //let plain_password = request.password
//         //put the hash in here, then set request.password to hash result, have the code written in the js of this file
//         //request.password = (Md5.hashStr("Monday01")).toString()
//         return UserModel.Model.create(request);
//     }

//     update(request: App.User): Promise<UserModel.UserInstance> {
        
//         return <any>(UserModel.Model.findById(request.ID).then((UserInstance) => {

//             UserInstance.firstName = request.firstName;
//             UserInstance.lastName = request.lastName;
//             UserInstance.roleID = request.roleID;
//             UserInstance.email = request.email;
//             UserInstance.active = request.active;
//             UserInstance.administrator = request.administrator;
//             if (request.password) {
//                 UserInstance.password = request.password;
//             }

//             return UserInstance.save();
//         }));
//     }

//     delete(ID: number) {

//         return UserModel.Model.findById(ID).then((UserInstance) => {

//             return UserInstance.destroy();

//         });
//     }

}

export = SQLService;