import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();

export interface GroupInstance extends Sequelize.Instance<GroupInstance, App.Group>, App.Group { }
export interface GroupModel extends Sequelize.Model<GroupInstance, App.Group> { }


var sequalizeModel = db.define<GroupInstance, App.Group>('group', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    }
});

//sequalizeModel.belongsTo(DepartmentModel.Model)

var flag = 0;

sequalizeModel.findAll({
}).then(function(result) {
    if(result == null)
        flag = 1; //Create default group if there isn't one yet
});

sequalizeModel.sync()    
export var Model = sequalizeModel;