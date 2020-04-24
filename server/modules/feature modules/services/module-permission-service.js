"use strict";
var Sequelize = require('sequelize');
var ModulePermissionModel = require('../models/module-permission-model');
var ModuleInstance = require('../models/module-instances-model');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
var ModulesModel = require('../models/module-model');
var Op = Sequelize.or;
var ModulePermissionService = (function () {
    function ModulePermissionService() {
    }
    ModulePermissionService.prototype.getList = function () {
        return ModulePermissionModel.Model.findAll();
    };
    ModulePermissionService.prototype.getByInstance = function (instanceID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (instanceID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { moduleInstanceID: instanceID }
                ],
                _a
            );
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
        var _a;
    };
    ModulePermissionService.prototype.getByUser = function (userID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { userID: userID }
                ],
                _a
            );
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll({ include: [{ model: ModuleInstance.Model, include: [ModulesModel.Model] }, { model: UserModel.Model }, { model: GroupModel.Model }] });
        var _a;
    };
    ModulePermissionService.prototype.getByGroup = function (groupID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { groupID: groupID }
                ],
                _a
            );
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll({ include: [{ model: ModuleInstance.Model, include: [ModulesModel.Model] }, { model: UserModel.Model }, { model: GroupModel.Model }] });
        var _a;
    };
    ModulePermissionService.prototype.getByUserAndGroup = function (userID, groups) {
        var op = Sequelize.or;
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { groupID: (_b = {}, _b[Sequelize.Op.or] = [groups], _b) },
                    { userID: userID }
                ],
                _a
            );
        }
        findOptions.include = [{ model: ModuleInstance.Model, include: [ModulesModel.Model] }, { model: UserModel.Model }, { model: GroupModel.Model }];
        return ModulePermissionModel.Model.findAll(findOptions);
        var _a, _b;
    };
    ModulePermissionService.prototype.get = function (ID) {
        return ModulePermissionModel.Model.findByPk(ID);
    };
    ModulePermissionService.prototype.create = function (request) {
        return ModulePermissionModel.Model.create(request);
    };
    ModulePermissionService.prototype.update = function (request) {
        return (ModulePermissionModel.Model.findByPk(request.ID).then(function (ModulePermissionInstance) {
            ModulePermissionInstance.edit = request.edit;
            ModulePermissionInstance.delete = request.delete;
            ModulePermissionInstance.owner = request.owner;
            ModulePermissionInstance.canGrant = request.canGrant;
            ModulePermissionInstance.grantedBy = request.grantedBy;
            ModulePermissionInstance.comments = request.comments;
            return ModulePermissionInstance.save();
        }));
    };
    ModulePermissionService.prototype.delete = function (ID) {
        return ModulePermissionModel.Model.findByPk(ID).then(function (ModulePermissionInstance) {
            return ModulePermissionInstance.destroy();
        });
    };
    return ModulePermissionService;
}());
module.exports = ModulePermissionService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-permission-service.js.map
