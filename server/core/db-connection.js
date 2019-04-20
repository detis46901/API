"use strict";
var Sequelize = require('sequelize');
var Environment = require('./environment');
function getDbConfig() {
    var config = {
        host: Environment.environment.DB_HOST,
        database: Environment.environment.DB_NAME,
        username: Environment.environment.DB_USERNAME,
        password: Environment.environment.DB_PASSWORD,
        port: Environment.environment.DB_PORT,
        ssl: (Environment.environment.DB_SSL == true),
        newdb: true
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
        },
        logging: true
    });
    return sequelize;
}
module.exports = createConnection;

//# sourceMappingURL=../source-maps/core/db-connection.js.map
