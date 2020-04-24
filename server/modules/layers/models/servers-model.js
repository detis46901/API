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
sequalizeModel.findAll({}).then(function (result) {
    if (!result[0]) {
        sequalizeModel.create({
            serverName: "IndianaMap",
            serverType: "ArcGIS WMS",
            serverURL: "http://maps.indiana.edu/arcgis/rest/services"
        })
            .then(function () {
            sequalizeModel.create({
                serverName: "Kokomo Geoserver",
                serverType: "Geoserver WMS",
                serverURL: "http://a.cityofkokomo.org:8080/geoserver/wms"
            });
        });
    }
    else {
        console.log('Users already exist');
    }
});
exports.Model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/servers-model.js.map
