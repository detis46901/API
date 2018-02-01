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
        //return db.query("UPDATE mycube.t" + table + ' SET "1" = true;')
        return db.query("UPDATE mycube.t" + table + " SET geom = (ST_SetSRID(ST_GeomFromGeoJSON('" + geometry + "'),4326)) WHERE id='" + id + "';")
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