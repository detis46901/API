import dbConnection = require('../../../core/db-connection');
import Sequelize = require('sequelize');
import GroupMemberModel = require('./group-member-model');

var db = dbConnection();
var bcrypt = require('bcrypt');

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
    active: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //only allow letters //1/3/18 why is this here? letter validation for a boolean type?
        }
    },
    email: { //consider adding isEmail: true when this is ready for deployment
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
            len: [1, 200],
            isEmail: true
        }
    },
    administrator: {
        type: Sequelize.BOOLEAN,
        validate: {
            is: ["[a-z]", 'i'] //1/3/18^^^
        }
    }
});

//console.log("\n\n"+sequalizeModel+"\n\n")

var flag = 0;

sequalizeModel.findAll({
}).then(function (result) {
    if (result == null)
        flag = 1; //Create default user if there isn't one yet
});

if (flag == 1) {
    var pw;
    bcrypt.hash("admin", 10, (err, hash) => {
        pw = hash
    })
    sequalizeModel.create({
        firstName: 'John',
        lastName: 'Doe',
        password: pw,
        active: false,
        email: 'john.doe@email.com',
        administrator: true
    })
}

//sequalizeModel.hasOne(GroupMemberModel.Model)

sequalizeModel.sync()
export var Model = sequalizeModel;