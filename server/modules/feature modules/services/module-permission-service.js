"use strict";
var Sequelize = require('sequelize');
var ModulePermissionModel = require('../models/module-permission-model');
var ModuleInstance = require('../models/module-instances-model');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
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
            findOptions.where = {
                $and: [
                    { moduleInstanceID: instanceID }
                ]
            };
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    };
    ModulePermissionService.prototype.getByUser = function (userID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            };
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    };
    ModulePermissionService.prototype.getByGroup = function (groupID) {
        console.log(groupID);
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = {
                $and: [
                    { groupID: groupID }
                ]
            };
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    };
    ModulePermissionService.prototype.getByUserAndGroup = function (userID, groups) {
        var op = Sequelize.or;
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $or: [
                    { groupID: { $or: [groups] } },
                    { userID: userID }
                ] };
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    };
    ModulePermissionService.prototype.get = function (ID) {
        return ModulePermissionModel.Model.findById(ID);
    };
    ModulePermissionService.prototype.create = function (request) {
        return ModulePermissionModel.Model.create(request);
    };
    ModulePermissionService.prototype.update = function (request) {
        return (ModulePermissionModel.Model.findById(request.ID).then(function (ModulePermissionInstance) {
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
        return ModulePermissionModel.Model.findById(ID).then(function (ModulePermissionInstance) {
            return ModulePermissionInstance.destroy();
        });
    };
    return ModulePermissionService;
}());
module.exports = ModulePermissionService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-permission-service.js.map
