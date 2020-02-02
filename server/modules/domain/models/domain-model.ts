import dbConnection = require('../../../core/db-connection')
import Sequelize = require('sequelize')

var db = dbConnection();

export interface DomainInstance extends Sequelize.Instance<DomainInstance, App.Domain>, App.Domain {}
export interface DomainModel extends Sequelize.Model<DomainInstance, App.Domain> {}

var sequelizeModel = db.define<DomainInstance, App.Domain>('domain', <any> {
    ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    centerlong: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    centerlat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    centerzoom: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        default: 13
    },
    bingmapskey: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    mapboxbasemapurl: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    localz: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    cacheSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 13
    }
})

sequelizeModel.sync()

export var Model = sequelizeModel