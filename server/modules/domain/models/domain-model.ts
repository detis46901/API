import dbConnection = require('../../../core/db-connection')
import Sequelize = require('sequelize')
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface DomainInstance extends Model<DomainInstance, App.Domain>, App.Domain {}
export interface DomainModel extends Model<DomainInstance, App.Domain> {}

var sequelizeModel = db.define<DomainInstance, App.Domain>('domain', <any> {
    ID: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    centerlong: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    centerlat: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    centerzoom: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        default: 13
    },
    bingmapskey: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    mapboxbasemapurl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    localz: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    cacheSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 13
    }
})

sequelizeModel.sync()

export var model = sequelizeModel