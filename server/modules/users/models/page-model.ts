import dbConnection = require('../../../core/db-connection');
import UserModel = require('../../users/models/user-model');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface PageInstance extends Model<PageInstance, App.UserPage>, App.UserPage { }
export interface PageModel extends Model<PageInstance, App.UserPage> { }


var sequalizeModel = db.define<PageInstance, App.UserPage>('user_page', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 200]
        }
    },
    pageOrder: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    default: {
        type: DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    },
});

sequalizeModel.belongsTo(UserModel.model);
sequalizeModel.sync()    

export var model = sequalizeModel;