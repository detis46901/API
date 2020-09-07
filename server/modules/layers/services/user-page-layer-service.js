"use strict";
var Sequelize = require('sequelize');
var UserPageLayerModel = require('../models/user-page-layer-model');
var PageModel = require('../../users/models/page-model');
var LayerModel = require('../models/layers-model');
var ServerModel = require('../models/servers-model');
var UserPageInstanceModel = require('../../feature modules/models/user-page-instance-model');
var ModuleInstanceModel = require('../../../modules/feature modules/models/module-instances-model');
var UserPageLayerService = (function () {
    function UserPageLayerService() {
    }
    UserPageLayerService.prototype.getList = function (pageID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (pageID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { pageID: pageID }
                ],
                _a
            );
        }
        return UserPageLayerModel.model.findAll(findOptions);
        var _a;
    };
    UserPageLayerService.prototype.getPageLayers = function (pageID) {
        var findOptions = {
            order: [
                'layerOrder'
            ]
        };
        if (pageID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { userPageID: pageID }
                ],
                _a
            );
        }
        findOptions.include = [PageModel.model, LayerModel.model, UserPageInstanceModel.model];
        return UserPageLayerModel.model.findAll({ order: ['layerOrder'], where: (_b = {}, _b[Sequelize.Op.and] = [{ userPageID: pageID }], _b), include: [{ model: PageModel.model }, { model: UserPageInstanceModel.model, include: [ModuleInstanceModel.model] }, { model: LayerModel.model, include: [ServerModel.model] }] });
        var _a, _b;
    };
    UserPageLayerService.prototype.getUserLayer = function (userID) {
        var findOptions = {
            order: [
                'userID'
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
        //return UserPageLayerModel.model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userID: userID}]}, include: [{model: UserModel.model}, {model: LayerModel.model}, {model: PageModel.model}]});
        return UserPageLayerModel.model.findAll(findOptions);
        var _a;
    };
    UserPageLayerService.prototype.getByLayer = function (layerID) {
        var findOptions = {
            order: [
                'layerID'
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
        return UserPageLayerModel.model.findAll(findOptions);
        var _a;
    };
    UserPageLayerService.prototype.get = function (rowID) {
        return UserPageLayerModel.model.findByPk(rowID);
    };
    UserPageLayerService.prototype.create = function (request) {
        return UserPageLayerModel.model.create(request);
    };
    UserPageLayerService.prototype.update = function (request) {
        return (UserPageLayerModel.model.findByPk(request.ID).then(function (UserPageLayerInstance) {
            UserPageLayerInstance.layerID = request.layerID;
            UserPageLayerInstance.userID = request.userID;
            UserPageLayerInstance.defaultON = request.defaultON;
            UserPageLayerInstance.style = request.style;
            UserPageLayerInstance.layerOrder = request.layerOrder;
            return UserPageLayerInstance.save();
        }));
    };
    UserPageLayerService.prototype.delete = function (ID) {
        return UserPageLayerModel.model.findByPk(ID).then(function (UserPageLayerInstance) {
            return UserPageLayerInstance.destroy();
        });
    };
    return UserPageLayerService;
}());
module.exports = UserPageLayerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/user-page-layer-service.js.map
