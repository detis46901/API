"use strict";
var Sequelize = require('sequelize');
var environment_1 = require('./environment');
function getDbConfig() {
    var config = {
        host: environment_1.environment.DB_HOST,
        database: environment_1.environment.DB_NAME,
        username: environment_1.environment.DB_USERNAME,
        password: environment_1.environment.DB_PASSWORD,
        port: environment_1.environment.DB_PORT,
        ssl: (environment_1.environment.DB_SSL == false),
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
            min: 1,
            idle: 10000
        },
        dialectOptions: {
            ssl: config.ssl
        },
        logging: false
    });
    return sequelize;
}
module.exports = createConnection;

//# sourceMappingURL=../source-maps/core/db-connection.js.map
