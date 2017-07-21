"use strict";
var UserPageLayerModel = require('../models/user-page-layer-model');
var PageModel = require('../../users/models/page-model');
var LayerModel = require('../models/layers-admin-model');
var UserPageLayerService = (function () {
    function UserPageLayerService() {
    }
    UserPageLayerService.prototype.getList = function (pageID) {
        var findOptions = {
            order: [
                'rowID'
            ]
        };
        if (pageID) {
            findOptions.where = {
                $and: [
                    { pageID: pageID }
                ]
            };
        }
        return UserPageLayerModel.Model.findAll(findOptions);
    };
    UserPageLayerService.prototype.getPageLayers = function (pageID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (pageID) {
            findOptions.where = {
                $and: [
                    { userPageID: pageID }
                ]
            };
        }
        findOptions.include = [PageModel.Model, LayerModel.Model];
        return UserPageLayerModel.Model.findAll(findOptions);
    };
    UserPageLayerService.prototype.getUserLayer = function (userID) {
        var findOptions = {
            order: [
                'rowID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            };
        }
        return UserPageLayerModel.Model.findAll(findOptions);
    };
    UserPageLayerService.prototype.get = function (rowID) {
        return UserPageLayerModel.Model.findById(rowID);
    };
    UserPageLayerService.prototype.create = function (request) {
        return UserPageLayerModel.Model.create(request);
    };
    UserPageLayerService.prototype.update = function (request) {
        return (UserPageLayerModel.Model.findById(request.ID).then(function (UserPageLayerInstance) {
            UserPageLayerInstance.layerAdminID = request.layerAdminID;
            UserPageLayerInstance.userID = request.userID;
            UserPageLayerInstance.layerON = request.layerON;
            return UserPageLayerInstance.save();
        }));
    };
    UserPageLayerService.prototype.delete = function (ID) {
        return UserPageLayerModel.Model.findById(ID).then(function (UserPageLayerInstance) {
            return UserPageLayerInstance.destroy();
        });
    };
    return UserPageLayerService;
}());
module.exports = UserPageLayerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/user-page-layer-service.js.map
