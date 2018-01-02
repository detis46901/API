"use strict";
var UserModel = require('../models/users-model');
var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.getList = function (email, password) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (email != null && password != null) {
            findOptions.where = {
                $and: [
                    { password: "" + password },
                    { email: "" + email },
                ]
            };
        }
        return UserModel.Model.findAll(findOptions);
    };
    AuthService.prototype.get = function (rowID) {
        return UserModel.Model.findById(rowID);
    };
    AuthService.prototype.getemail = function (email) {
        return UserModel.Model.findById(email);
    };
    AuthService.prototype.create = function (request) {
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
        })*/ //hashing attempt
        return UserModel.Model.create(request);
    };
    AuthService.prototype.update = function (request) {
        return (UserModel.Model.findById(request.ID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.roleID = request.roleID;
            return UserInstance.save();
        }));
    };
    AuthService.prototype.delete = function (rowID) {
        return UserModel.Model.findById(rowID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    return AuthService;
}());
module.exports = AuthService;

//# sourceMappingURL=../../../source-maps/modules/users/services/authenticate-service.js.map
