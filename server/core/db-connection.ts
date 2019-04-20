import Sequelize = require('sequelize');
import Environment = require('./environment')

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
        host: Environment.environment.DB_HOST, //''127.0.0.1', //for localhost
        database: Environment.environment.DB_NAME,
        username: Environment.environment.DB_USERNAME, //7/6/17 - db password
        password: Environment.environment.DB_PASSWORD,
        port: Environment.environment.DB_PORT,
        ssl: (Environment.environment.DB_SSL == true),
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