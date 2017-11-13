"use strict";
var LayerPermissionModel = require('../models/layers-permission-model');
var LayerModel = require('../models/layers-admin-model');
var LayerPermissionService = (function () {
    function LayerPermissionService() {
    }
    LayerPermissionService.prototype.getList = function (layerAdminID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (layerAdminID) {
            findOptions.where = {
                $and: [
                    { layerAdminID: layerAdminID }
                ]
            };
        }
        findOptions.include = [LayerModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    };
    LayerPermissionService.prototype.getUserLayer = function (userID) {
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
        findOptions.include = [LayerModel.Model];
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
            LayerPermissionInstance.layerAdminID = request.layerAdminID;
            LayerPermissionInstance.userID = request.userID;
            LayerPermissionInstance.edit = request.edit;
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
