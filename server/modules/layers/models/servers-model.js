"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var sequalizeModel = db.define('server', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    serverName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    serverType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    serverURL: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    }
});
sequalizeModel.sync({ force: false });
// user this to initialize the database
// sequalizeModel.sync({force: true})
// .then(() => {
// sequalizeModel.create({
//     serverName: "IndianaMap",
//     serverType: "ArcGIS",
//     serverURL: "http://maps.indiana.edu/arcgis/rest/services"
// })})
// .then(() => {
// sequalizeModel.create({
//     serverName: "Kokomo Geoserver",
//     serverType: "Geoserver",
//     serverURL: "http://foster2.cityofkokomo.org:8080/geoserver/wms"  
// })
//     })
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/servers-model.js.map
