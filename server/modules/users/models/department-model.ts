import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();

export interface DepartmentInstance extends Sequelize.Instance<DepartmentInstance, App.Department>, App.Department { }
export interface DepartmentModel extends Sequelize.Model<DepartmentInstance, App.Department> { }


var sequalizeModel = db.define<DepartmentInstance, App.Department>('department', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    department: {
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


sequalizeModel.sync()    

export var Model = sequalizeModel;