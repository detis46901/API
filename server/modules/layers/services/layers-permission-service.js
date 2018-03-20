"use strict";
var Sequelize = require('sequelize');
var LayerPermissionModel = require('../models/layers-permission-model');
var LayerModel = require('../models/layers-model');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
var Op = Sequelize.or;
var LayerPermissionService = (function () {
    function LayerPermissionService() {
    }
    LayerPermissionService.prototype.getList = function () {
        return LayerPermissionModel.Model.findAll();
    };
    LayerPermissionService.prototype.getByLayer = function (layerID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (layerID) {
            findOptions.where = {
                $and: [
                    { layerID: layerID }
                ]
            };
        }
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    };
    LayerPermissionService.prototype.getByUser = function (userID) {
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    };
    LayerPermissionService.prototype.getByGroup = function (groupID) {
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    };
    LayerPermissionService.prototype.getByUserAndGroup = function (userID, groups) {
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    };
    LayerPermissionService.prototype.get = function (ID) {
        return LayerPermissionModel.Model.findById(ID);
    };
    LayerPermissionService.prototype.create = function (request) {
        return LayerPermissionModel.Model.create(request);
    };
    LayerPermissionService.prototype.update = function (request) {
        return (LayerPermissionModel.Model.findById(request.ID).then(function (LayerPermissionInstance) {
            //Probably should disallow foreign key editing. Create new entry if need new user/layer permission.
            //LayerPermissionInstance.layerID = request.layerID;
            //LayerPermissionInstance.userID = request.userID;
            LayerPermissionInstance.edit = request.edit;
            LayerPermissionInstance.delete = request.delete;
            LayerPermissionInstance.owner = request.owner;
            LayerPermissionInstance.canGrant = request.canGrant;
            LayerPermissionInstance.grantedBy = request.grantedBy;
            LayerPermissionInstance.comments = request.comments;
            return LayerPermissionInstance.save();
        }));
    };
    LayerPermissionService.prototype.delete = function (ID) {
        return LayerPermissionModel.Model.findById(ID).then(function (LayerPermissionInstance) {
            return LayerPermissionInstance.destroy();
        });
    };
    return LayerPermissionService;
}());
module.exports = LayerPermissionService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-permission-service.js.map
