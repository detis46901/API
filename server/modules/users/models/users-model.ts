import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();


export interface UserInstance extends Sequelize.Instance<UserInstance, App.User>, App.User { }
export interface UserModel extends Sequelize.Model<UserInstance, App.User> { }


var sequalizeModel = db.define<UserInstance, App.User>('user', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    roleID: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },    
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    },
    email: { //consider adding isEmail: true when this is ready for deployment
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    administrator: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]",'i']
        }
    }
});

sequalizeModel.sync()    

export var Model = sequalizeModel;