"use strict";
var dbConnection = require('../../../core/db-connection');
var ServerModel = require('./servers-model');
var DomainModel = require('../../domain/models/domain-model');
var sequelize_1 = require("sequelize");
var db = dbConnection();
var sequalizeModel = db.define('layer', {
    ID: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    layerName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    layerService: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    layerIdent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    layerFormat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    layerDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    layerGeom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 200]
        }
    },
    defaultStyle: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        defaultValue: '{"load":{"color":"#000000","width":2},"current":{"color":"#000000","width":4}}'
    }
});
sequalizeModel.belongsTo(ServerModel.model);
sequalizeModel.belongsTo(DomainModel.model);
sequalizeModel.sync();
exports.model = sequalizeModel;

//# sourceMappingURL=../../../source-maps/modules/layers/models/layers-model.js.map
