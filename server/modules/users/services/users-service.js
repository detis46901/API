"use strict";
var UserModel = require('../models/users-model');
var bcrypt = require('bcrypt');
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'lastName'
            ]
        };
        if (searchValue) {
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: "%" + searchValue + "%" } },
                    { lastName: { $iLike: "%" + searchValue + "%" } },
                    { email: { $iLike: "%" + searchValue + "%" } },
                ]
            };
        }
        return UserModel.Model.findAll(findOptions);
    };
    UserService.prototype.get = function (rowID) {
        return UserModel.Model.findById(rowID);
    };
    UserService.prototype.create = function (request) {
        /*let plain_password = request.password;

        bcrypt.genSalt(11, function (err, salt) {
            if (err) {
                return console.log(err);
            }

            bcrypt.hash(plain_password, salt, function (err, hashedPassword) {
                if (err) {
                    return console.log(err);
                }

                request.password = hashedPassword;
            })
        })*/ //Attempting to hash

        return UserModel.Model.create(request);
    };
    UserService.prototype.update = function (request) {
        return (UserModel.Model.findById(request.rowID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.roleID = request.roleID;
            UserInstance.email = request.email;
            UserInstance.active = request.active;
            UserInstance.administrator = request.administrator;
            if (request.password) {
                UserInstance.password = request.password;
            }
            return UserInstance.save();
        }));
    };
    UserService.prototype.delete = function (rowID) {
        return UserModel.Model.findById(rowID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    return UserService;
}());
module.exports = UserService;

//# sourceMappingURL=../../../source-maps/modules/users/services/users-service.js.map
