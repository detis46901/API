"use strict";
var Sequelize = require('sequelize');
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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { firstName: (_b = {}, _b[Sequelize.Op.iLike] = "%" + searchValue + "%", _b) },
                    { lastName: (_c = {}, _c[Sequelize.Op.iLike] = "%" + searchValue + "%", _c) },
                    { email: (_d = {}, _d[Sequelize.Op.iLike] = "%" + searchValue + "%", _d) },
                ],
                _a
            );
        }
        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    ModuleInstancesService.prototype.get = function (rowID) {
        var findOptions = {};
        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.findByPk(rowID, findOptions);
    };
    ModuleInstancesService.prototype.create = function (request) {
        var findOptions = {};
        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.create(request, findOptions);
    };
    ModuleInstancesService.prototype.update = function (request) {
        return (ModuleInstancesModel.model.findByPk(request.ID).then(function (ModuleInstance) {
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            ModuleInstance.settings = request.settings;
            return ModuleInstance.save();
        }));
    };
    ModuleInstancesService.prototype.delete = function (ID) {
        return ModuleInstancesModel.model.findByPk(ID).then(function (ModuleInstance) {
            return ModuleInstance.destroy();
        });
    };
    return ModuleInstancesService;
}());
module.exports = ModuleInstancesService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-instances-service.js.map
