import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import DepartmentModel = require('./department-model')

var db = dbConnection();

export interface GroupInstance extends Sequelize.Instance<GroupInstance, App.Group>, App.Group { }
export interface GroupModel extends Sequelize.Model<GroupInstance, App.Group> { }


var sequalizeModel = db.define<GroupInstance, App.Group>('group', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    group: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]",'i'] //only allow letters
        }
    }
});



sequalizeModel.belongsTo(DepartmentModel.Model)

var flag = 0;

sequalizeModel.findAll({
}).then(function(result) {
    if(result == null)
        flag = 1; //Create default group if there isn't one yet
});

if(flag == 1) {
    sequalizeModel.create({
        group: 'Engineering',
        active: true,
        departmentID: 1
    })
}

sequalizeModel.sync()    
export var Model = sequalizeModel;