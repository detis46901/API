import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();


export interface PageInstance extends Sequelize.Instance<PageInstance, App.UserPage>, App.UserPage { }
export interface PageModel extends Sequelize.Model<PageInstance, App.UserPage> { }


var sequalizeModel = db.define<PageInstance, App.UserPage>('user_page', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userID: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },
    page: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    pageOrder: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1
        }
    },
    default: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    },
});

sequalizeModel.sync()    

export var Model = sequalizeModel;