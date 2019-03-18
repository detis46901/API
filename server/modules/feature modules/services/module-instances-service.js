"use strict";
var ModuleInstancesModel = require('../models/module-instances-model');
var ModuleModel = require('../models/module-model');
var ModuleInstancesService = (function () {
    function ModuleInstancesService() {
    }
    ModuleInstancesService.prototype.getList = function (searchValue) {
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
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.findAll(findOptions);
    };
    ModuleInstancesService.prototype.get = function (rowID) {
        var findOptions = {};
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.findById(rowID, findOptions);
    };
    ModuleInstancesService.prototype.create = function (request) {
        var findOptions = {};
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.create(request, findOptions);
    };
    ModuleInstancesService.prototype.update = function (request) {
        return (ModuleInstancesModel.Model.findById(request.ID).then(function (ModuleInstance) {
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            ModuleInstance.settings = request.settings;
            return ModuleInstance.save();
        }));
    };
    ModuleInstancesService.prototype.delete = function (ID) {
        return ModuleInstancesModel.Model.findById(ID).then(function (ModuleInstance) {
            return ModuleInstance.destroy();
        });
    };
    return ModuleInstancesService;
}());
module.exports = ModuleInstancesService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-instances-service.js.map
