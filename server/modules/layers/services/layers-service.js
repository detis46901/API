"use strict";
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
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: "%" + searchValue + "%" } },
                    { lastName: { $iLike: "%" + searchValue + "%" } },
                    { email: { $iLike: "%" + searchValue + "%" } },
                ]
            };
        }
        findOptions.include = [ServerModel.Model];
        return LayerModel.Model.findAll(findOptions);
    };
    LayerService.prototype.get = function (rowID) {
        return LayerModel.Model.findById(rowID);
    };
    LayerService.prototype.create = function (request) {
        console.log("Creating layer, request= " + request.layerName);
        return LayerModel.Model.create(request);
    };
    LayerService.prototype.update = function (request) {
        return (LayerModel.Model.findById(request.ID).then(function (LayerInstance) {
            LayerInstance.layerName = request.layerName;
            LayerInstance.layerType = request.layerType;
            LayerInstance.serverID = request.serverID;
            LayerInstance.layerService = request.layerService;
            LayerInstance.layerIdent = request.layerIdent;
            LayerInstance.layerFormat = request.layerFormat;
            LayerInstance.layerDescription = request.layerDescription;
            LayerInstance.layerGeom = request.layerGeom;
            console.log("API layer service");
            return LayerInstance.save();
        }));
    };
    LayerService.prototype.delete = function (ID) {
        return LayerModel.Model.findById(ID).then(function (LayerInstance) {
            return LayerInstance.destroy();
        });
    };
    return LayerService;
}());
module.exports = LayerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-service.js.map
