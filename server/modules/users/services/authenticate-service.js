"use strict";
var UserModel = require('../models/user-model');
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
        return UserModel.Model.create(request);
    };
    AuthService.prototype.update = function (request) {
        return (UserModel.Model.findById(request.ID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
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
