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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { layerID: layerID }
                ],
                _a
            );
        }
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
        var _a;
    };
    LayerPermissionService.prototype.getByGroup = function (groupID) {
        //console.log(groupID)
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
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
        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
        var _a, _b;
    };
    LayerPermissionService.prototype.get = function (ID) {
        return LayerPermissionModel.Model.findByPk(ID);
    };
    LayerPermissionService.prototype.create = function (request) {
        return LayerPermissionModel.Model.create(request);
    };
    LayerPermissionService.prototype.update = function (request) {
        return (LayerPermissionModel.Model.findByPk(request.ID).then(function (LayerPermissionInstance) {
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
        return LayerPermissionModel.Model.findByPk(ID).then(function (LayerPermissionInstance) {
            return LayerPermissionInstance.destroy();
        });
    };
    return LayerPermissionService;
}());
module.exports = LayerPermissionService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-permission-service.js.map
