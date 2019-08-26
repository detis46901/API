"use strict";
var Sequelize = require('sequelize');
var UserModel = require('../models/user-model');
//import ParentService = require('../../parent-service');
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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { firstName: (_b = {}, _b[Sequelize.Op.iLike] = "%" + searchValue + "%", _b) },
                    { lastName: (_c = {}, _c[Sequelize.Op.iLike] = "%" + searchValue + "%", _c) },
                    { email: (_d = {}, _d[Sequelize.Op.iLike] = "%" + searchValue + "%", _d) },
                ],
                _a
            );
        }
        return UserModel.Model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    UserService.prototype.get = function (rowID) {
        return UserModel.Model.findByPk(rowID);
    };
    UserService.prototype.create = function (request) {
        return UserModel.Model.create(request);
    };
    UserService.prototype.update = function (request) {
        return (UserModel.Model.findByPk(request.ID).then(function (UserInstance) {
            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.email = request.email;
            UserInstance.active = request.active;
            UserInstance.administrator = request.administrator;
            if (request.password) {
                UserInstance.password = request.password;
            }
            return UserInstance.save();
        }));
    };
    UserService.prototype.delete = function (ID) {
        return UserModel.Model.findByPk(ID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    return UserService;
}());
module.exports = UserService;

//# sourceMappingURL=../../../source-maps/modules/routes/services/user-service.js.map
