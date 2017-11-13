"use strict";
var LayerAdminModel = require('../models/layers-admin-model');
var ServerModel = require('../models/servers-model');
var LayerAdminService = (function () {
    function LayerAdminService() {
    }
    LayerAdminService.prototype.getList = function (searchValue) {
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
        return LayerAdminModel.Model.findAll(findOptions);
    };
    LayerAdminService.prototype.get = function (rowID) {
        return LayerAdminModel.Model.findById(rowID);
    };
    LayerAdminService.prototype.create = function (request) {
        console.log("Creating layer, request= " + request.layerName);
        return LayerAdminModel.Model.create(request);
    };
    LayerAdminService.prototype.update = function (request) {
        return (LayerAdminModel.Model.findById(request.ID).then(function (LayerAdminInstance) {
            LayerAdminInstance.layerName = request.layerName;
            LayerAdminInstance.layerType = request.layerType;
            LayerAdminInstance.serverID = request.serverID;
            LayerAdminInstance.layerService = request.layerService;
            LayerAdminInstance.layerIdent = request.layerIdent;
            LayerAdminInstance.layerFormat = request.layerFormat;
            LayerAdminInstance.layerDescription = request.layerDescription;
            LayerAdminInstance.layerGeom = request.layerGeom;
            console.log("API layeradmin service");
            return LayerAdminInstance.save();
        }));
    };
    LayerAdminService.prototype.delete = function (ID) {
        return LayerAdminModel.Model.findById(ID).then(function (LayerAdminInstance) {
            console.log(LayerAdminInstance);
            return LayerAdminInstance.destroy();
        });
    };
    return LayerAdminService;
}());
module.exports = LayerAdminService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-admin-service.js.map
