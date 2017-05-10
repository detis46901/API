import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');

var db = dbConnection();

export interface DepartmentInstance extends Sequelize.Instance<DepartmentInstance, App.Department>, App.Department { }
export interface DepartmentModel extends Sequelize.Model<DepartmentInstance, App.Department> { }
export interface GroupInstance extends Sequelize.Instance<GroupInstance, App.Group>, App.Group { }
export interface GroupModel extends Sequelize.Model<GroupInstance, App.Group> { }
export interface RoleInstance extends Sequelize.Instance<RoleInstance, App.Role>, App.Role { }
export interface RoleModel extends Sequelize.Model<RoleInstance, App.Role> { }

var departmentModel = db.define<DepartmentInstance, App.Department>('department', <any>{
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
}), groupModel = db.define<GroupInstance, App.Group>('group', <any>{
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
}), roleModel = db.define<RoleInstance, App.Role>('role', <any>{
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    role: {
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

groupModel.belongsTo(departmentModel)
roleModel.belongsTo(groupModel)

db.sync({force: true})

export var dModel = departmentModel;
export var gModel = groupModel;
export var rModel = roleModel;