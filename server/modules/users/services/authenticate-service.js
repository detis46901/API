"use strict";
var UserModel = require('../models/users-model');
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.getList = function (email, password) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (email, password) {
            findOptions.where = {
                $and: [
                    { password: "" + password },
                    { email: "" + email },
                ]
            };
        }
        return UserModel.Model.findAll(findOptions);
    };
    UserService.prototype.get = function (rowID) {
        return UserModel.Model.findById(rowID);
    };
    UserService.prototype.getemail = function (email) {
        return UserModel.Model.findById(email);
    };
    UserService.prototype.create = function (request) {
        return UserModel.Model.create(request);
    };
    UserService.prototype.update = function (request) {
        return (UserModel.Model.findById(request.ID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.roleID = request.roleID;
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

//# sourceMappingURL=../../../source-maps/modules/users/services/authenticate-service.js.map
