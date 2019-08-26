"use strict";
var Sequelize = require('sequelize');
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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { password: "" + password },
                    { email: "" + email },
                ],
                _a
            );
        }
        return UserModel.Model.findAll(findOptions);
        var _a;
    };
    AuthService.prototype.get = function (rowID) {
        return UserModel.Model.findByPk(rowID);
    };
    AuthService.prototype.getemail = function (email) {
        return UserModel.Model.findByPk(email);
    };
    AuthService.prototype.create = function (request) {
        return UserModel.Model.create(request);
    };
    AuthService.prototype.update = function (request) {
        return (UserModel.Model.findByPk(request.ID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            return UserInstance.save();
        }));
    };
    AuthService.prototype.delete = function (rowID) {
        return UserModel.Model.findByPk(rowID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    return AuthService;
}());
module.exports = AuthService;

//# sourceMappingURL=../../../source-maps/modules/routes/services/authenticate-service.js.map
