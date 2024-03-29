"use strict";
var Sequelize = require('sequelize');
var LayerPermissionModel = require('../models/layers-permission-model');
var LayerModel = require('../models/layers-model');
var UserModel = require('../../users/models/user-model');
var GroupModel = require('../../users/models/group-model');
var ServerModel = require('../models/servers-model');
var Op = Sequelize.or;
var LayerPermissionService = (function () {
    function LayerPermissionService() {
    }
    LayerPermissionService.prototype.getList = function () {
        return LayerPermissionModel.model.findAll();
    };
    LayerPermissionService.prototype.getByLayer = function (layerID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (layerID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { layerID: layerID }
                ],
                _a
            );
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
        var _a;
    };
    LayerPermissionService.prototype.getByUser = function (userID) {
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
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
        var _a;
    };
    LayerPermissionService.prototype.getByGroup = function (groupID) {
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
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
        var _a;
    };
    LayerPermissionService.prototype.getByUserAndGroup = function (userID, groups) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.order = ['ID'];
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { groupID: (_b = {}, _b[Sequelize.Op.or] = [groups], _b) },
                    { userID: userID }
                ],
                _a
            );
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
        var _a, _b;
    };
    LayerPermissionService.prototype.get = function (ID) {
        return LayerPermissionModel.model.findByPk(ID);
    };
    LayerPermissionService.prototype.create = function (request) {
        return LayerPermissionModel.model.create(request);
    };
    LayerPermissionService.prototype.update = function (request) {
        return (LayerPermissionModel.model.findByPk(request.ID).then(function (LayerPermissionInstance) {
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
        return LayerPermissionModel.model.findByPk(ID).then(function (LayerPermissionInstance) {
            return LayerPermissionInstance.destroy();
        });
    };
    return LayerPermissionService;
}());
module.exports = LayerPermissionService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-permission-service.js.map
