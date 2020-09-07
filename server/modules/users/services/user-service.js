"use strict";
var Sequelize = require('sequelize');
var UserModel = require('../models/user-model');
var DomainModel = require('../../domain/models/domain-model');
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
        return UserModel.model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    UserService.prototype.get = function (rowID) {
        var findOptions = {};
        findOptions.include = [DomainModel.model];
        return UserModel.model.findByPk(rowID, findOptions);
    };
    UserService.prototype.create = function (request) {
        if (!request.apikey) {
            request.apikey = this.generateKey();
        }
        return UserModel.model.create(request);
    };
    UserService.prototype.update = function (request) {
        var _this = this;
        return (UserModel.model.findByPk(request.ID).then(function (UserInstance) {
            console.log(UserInstance.apikey);
            console.log(request.apikey);
            if (!request.apikey) {
                UserInstance.apikey = _this.generateKey();
            }
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
        return UserModel.model.findByPk(ID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    UserService.prototype.generateKey = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };
    return UserService;
}());
module.exports = UserService;

//# sourceMappingURL=../../../source-maps/modules/users/services/user-service.js.map
