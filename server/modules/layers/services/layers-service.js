"use strict";
var Sequelize = require('sequelize');
var LayerModel = require('../models/layers-model');
var ServerModel = require('../models/servers-model');
var LayerService = (function () {
    function LayerService() {
    }
    LayerService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (searchValue) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { firstName: (_b = {}, _b[Sequelize.Op.iLike] = "%" + searchValue + "%", _b) },
                    { lastName: (_c = {}, _c[Sequelize.Op.iLike] = "%" + searchValue + "%", _c) },
                    { email: (_d = {}, _d[Sequelize.Op.iLike] = "%" + searchValue + "%", _d) },
                ],
                _a
            );
        }
        findOptions.include = [ServerModel.Model];
        return LayerModel.Model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    LayerService.prototype.get = function (rowID) {
        return LayerModel.Model.findByPk(rowID);
    };
    LayerService.prototype.create = function (request) {
        return LayerModel.Model.create(request);
    };
    LayerService.prototype.update = function (request) {
        return (LayerModel.Model.findByPk(request.ID).then(function (LayerInstance) {
            LayerInstance.layerName = request.layerName;
            LayerInstance.layerType = request.layerType;
            LayerInstance.serverID = request.serverID;
            LayerInstance.layerService = request.layerService;
            LayerInstance.layerIdent = request.layerIdent;
            LayerInstance.layerFormat = request.layerFormat;
            LayerInstance.layerDescription = request.layerDescription;
            LayerInstance.layerGeom = request.layerGeom;
            LayerInstance.defaultStyle = request.defaultStyle;
            return LayerInstance.save();
        }));
    };
    LayerService.prototype.delete = function (ID) {
        return LayerModel.Model.findByPk(ID).then(function (LayerInstance) {
            return LayerInstance.destroy();
        });
    };
    return LayerService;
}());
module.exports = LayerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-service.js.map
