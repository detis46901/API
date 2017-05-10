"use strict";
var RoleModel = require('../models/role-model');
var RoleService = (function () {
    function RoleService() {
    }
    RoleService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'role'
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
        return RoleModel.Model.findAll(findOptions);
    };
    RoleService.prototype.getrolesgroupsdepartments = function (searchValue) {
        var findOptions = {
            order: [
                'role'
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
        return RoleModel.Model.findAll(findOptions);
    };
    RoleService.prototype.get = function (rowID) {
        return RoleModel.Model.findById(rowID);
    };
    RoleService.prototype.create = function (request) {
        console.log("made it to the API");
        return RoleModel.Model.create(request);
    };
    RoleService.prototype.update = function (request) {
        return (RoleModel.Model.findById(request.ID).then(function (RoleInstance) {
            RoleInstance.role = request.role;
            RoleInstance.active = request.active;
            return RoleInstance.save();
        }));
    };
    RoleService.prototype.delete = function (rowID) {
        return RoleModel.Model.findById(rowID).then(function (RoleInstance) {
            return RoleInstance.destroy();
        });
    };
    return RoleService;
}());
module.exports = RoleService;

//# sourceMappingURL=../../../source-maps/modules/users/services/role-service.js.map
