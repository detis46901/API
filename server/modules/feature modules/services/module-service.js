"use strict";
var ModuleModel = require('../models/module-model');
var ModuleService = (function () {
    function ModuleService() {
    }
    ModuleService.prototype.getList = function (searchValue) {
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
        return ModuleModel.Model.findAll(findOptions);
    };
    ModuleService.prototype.get = function (rowID) {
        return ModuleModel.Model.findById(rowID);
    };
    ModuleService.prototype.create = function (request) {
        return ModuleModel.Model.create(request);
    };
    ModuleService.prototype.update = function (request) {
        return (ModuleModel.Model.findById(request.ID).then(function (ModuleInstance) {
            ModuleInstance.identity = request.identity;
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            return ModuleInstance.save();
        }));
    };
    ModuleService.prototype.delete = function (ID) {
        return ModuleModel.Model.findById(ID).then(function (ModuleInstance) {
            return ModuleInstance.destroy();
        });
    };
    return ModuleService;
}());
module.exports = ModuleService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-service.js.map
