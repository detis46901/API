"use strict";
var UserModel = require('../models/users-model');
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
        //let plain_password = request.password
        //put the hash in here, then set request.password to hash result, have the code written in the js of this file
        //request.password = (Md5.hashStr("Monday01")).toString()
        return UserModel.Model.create(request);
    };
    UserService.prototype.update = function (request) {
        return (UserModel.Model.findById(request.ID).then(function (UserInstance) {
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
    UserService.prototype.delete = function (ID) {
        return UserModel.Model.findById(ID).then(function (UserInstance) {
            return UserInstance.destroy();
        });
    };
    return UserService;
}());
module.exports = UserService;

//# sourceMappingURL=../../../source-maps/modules/users/services/users-service.js.map
