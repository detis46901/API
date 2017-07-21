import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();
export interface ServerInstance extends Sequelize.Instance<ServerInstance, App.Server>, App.Server { }
export interface ServerModel extends Sequelize.Model<ServerInstance, App.Server> { }

var sequalizeModel = db.define<ServerInstance, App.Server>('server', <any> {
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

sequalizeModel.sync();

//console.log(temp)

export var Model = sequalizeModel;