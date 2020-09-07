import dbConnection = require('../../../core/db-connection');
import { Model, DataTypes } from "sequelize";

var db = dbConnection();

export interface GroupInstance extends Model<GroupInstance, App.Group>, App.Group { }
export interface GroupModel extends Model<GroupInstance, App.Group> { }

var sequalizeModel = db.define<GroupInstance, App.Group>('group', <any>{
    ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    description: {
        type: DataTypes.STRING,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    }
});

var flag = 0;
sequalizeModel.findAll({
}).then(function(result) {
    if(result == null)
        flag = 1; //Create default group if there isn't one yet
});

sequalizeModel.sync()    
export var model = sequalizeModel;