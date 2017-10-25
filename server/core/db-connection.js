"use strict";
var Sequelize = require('sequelize');
function getDbConfig() {
    var config = {
        host: process.env.DB_HOST || 'pgis-kokomo.cdxshbbvmooi.us-east-2.rds.amazonaws.com',
        database: process.env.DB_NAME || 'postgres_test',
        username: process.env.DB_USERNAME || 'geoadmin',
        password: process.env.DB_PASSWORD || 'G30s3rv3r',
        port: process.env.DB_PORT || 5432,
        ssl: process.env.DB_PORT || false
    };
    return config;
}
function createConnection() {
    var config = getDbConfig();
    var sequelize = new Sequelize(config.database, config.username, config.password, {
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
    });
    return sequelize;
}
module.exports = createConnection;

//# sourceMappingURL=../source-maps/core/db-connection.js.map
