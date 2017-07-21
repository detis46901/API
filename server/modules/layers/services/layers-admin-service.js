"use strict";
var LayerAdminModel = require('../models/layers-admin-model');
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
        return LayerAdminModel.Model.findAll(findOptions);
    };
    LayerAdminService.prototype.get = function (rowID) {
        return LayerAdminModel.Model.findById(rowID);
    };
    LayerAdminService.prototype.create = function (request) {
        return LayerAdminModel.Model.create(request);
    };
    LayerAdminService.prototype.update = function (request) {
        return (LayerAdminModel.Model.findById(request.ID).then(function (LayerAdminInstance) {
            LayerAdminInstance.layerName = request.layerName;
            LayerAdminInstance.layerType = request.layerType;
            LayerAdminInstance.serverID = request.serverID;
            LayerAdminInstance.layerIdent = request.layerIdent;
            LayerAdminInstance.layerFormat = request.layerFormat;
            LayerAdminInstance.layerDescription = request.layerDescription;
            LayerAdminInstance.layerGeom = request.layerGeom;
            console.log("API layeradmin service");
            return LayerAdminInstance.save();
        }));
    };
    LayerAdminService.prototype.delete = function (rowID) {
        return LayerAdminModel.Model.findById(rowID).then(function (LayerAdminInstance) {
            return LayerAdminInstance.destroy();
        });
    };
    return LayerAdminService;
}());
module.exports = LayerAdminService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/layers-admin-service.js.map
