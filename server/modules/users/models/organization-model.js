"use strict";
var dbConnection = require('../../../core/db-connection');
var Sequelize = require('sequelize');
var db = dbConnection();
var departmentModel = db.define('department', {
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
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
}), groupModel = db.define('group', {
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
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
}), roleModel = db.define('role', {
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
            is: ["[a-z]", 'i'] //only allow letters
        }
    }
});
groupModel.belongsTo(departmentModel);
roleModel.belongsTo(groupModel);
db.sync({ force: true });
exports.dModel = departmentModel;
exports.gModel = groupModel;
exports.rModel = roleModel;

//# sourceMappingURL=../../../source-maps/modules/users/models/organization-model.js.map
