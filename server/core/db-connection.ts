import Sequelize = require('sequelize');
import {environment } from './environment'

interface IDbConfig {
    host: string;
    database: string;
    username: string;
    password: string;
    port: number;
    ssl?: boolean;
    newdb: boolean;
}

function getDbConfig() {

    var config: IDbConfig = {
        host:environment.DB_HOST, //''127.0.0.1', //for localhost
        database: environment.DB_NAME,
        username: environment.DB_USERNAME, //7/6/17 - db password
        password: environment.DB_PASSWORD,
        port: environment.DB_PORT,
        ssl: (environment.DB_SSL == false),
        newdb: true
    };
    return config;
}

function createConnection() {

    let config = getDbConfig();

    var sequelize = new Sequelize(config.database, config.username, config.password, <any>{
        host: config.host,
        dialect: 'postgres',
        port: config.port,
        pool: {
            max: 10,
            min: 0,
            idle: 10000
        },
        dialectOptions: {
            ssl: config.ssl
        },
        logging:true
        // SQLite only
        //storage: '../sqllite'
    });

    return sequelize;
}

export = createConnection;