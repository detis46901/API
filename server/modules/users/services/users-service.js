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
    UserService.prototype.getByRole = function (roleID) {
        var findOptions = {
            order: [
                'roleID'
            ]
        };
        if (roleID) {
            findOptions.where = {
                $and: [
                    { roleID: roleID }
                ]
            };
        }
        return UserModel.Model.findAll(findOptions);
    };
    UserService.prototype.get = function (rowID) {
        return UserModel.Model.findById(rowID);
    };
    UserService.prototype.create = function (request) {
        return UserModel.Model.create(request);
    };
    UserService.prototype.login = function (request) {
        // var email = new Array<string>();
        // email.push("email", "email")
        // //var email = ["email", "email"]
        // UserModel.Model.find({attributes:email = request.body.email})
        // .exec()
        // .then(user => {
        //     if(user) {
        //         return res.status(409).json({
        //             message: "User already exists."
        //         })
        //     } else {
        //     }
        // })
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
