import Sequelize = require('sequelize');

interface IDbConfig {
    host?: string;
    database?: string;
    username?: string;
    password?: string;
    port?: number;
    ssl?: boolean;
}

function getDbConfig() {

    var config: IDbConfig = {
        host: process.env.DB_HOST || 'pgis-kokomo.cdxshbbvmooi.us-east-2.rds.amazonaws.com', //''127.0.0.1', //for localhost
        database: process.env.DB_NAME || 'postgres_test',
        username: process.env.DB_USERNAME || 'geoadmin', //7/6/17 - db password
        password: process.env.DB_PASSWORD || 'G30s3rv3r',
        port: process.env.DB_PORT || 5432,
        ssl: process.env.DB_PORT || false
    };

    return config;
}

function createConnection() {

    var config = getDbConfig();

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
        }
        // SQLite only
        //storage: '../sqllite'
    });

    return sequelize;
}

export = createConnection;