"use strict";
var Sequelize = require('sequelize');
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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { firstName: (_b = {}, _b[Sequelize.Op.iLike] = "%" + searchValue + "%", _b) },
                    { lastName: (_c = {}, _c[Sequelize.Op.iLike] = "%" + searchValue + "%", _c) },
                    { email: (_d = {}, _d[Sequelize.Op.iLike] = "%" + searchValue + "%", _d) },
                ],
                _a
            );
        }
        return ModuleModel.model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    ModuleService.prototype.get = function (rowID) {
        return ModuleModel.model.findByPk(rowID);
    };
    ModuleService.prototype.create = function (request) {
        return ModuleModel.model.create(request);
    };
    ModuleService.prototype.update = function (request) {
        return (ModuleModel.model.findByPk(request.ID).then(function (ModuleInstance) {
            ModuleInstance.identity = request.identity;
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            return ModuleInstance.save();
        }));
    };
    ModuleService.prototype.delete = function (ID) {
        return ModuleModel.model.findByPk(ID).then(function (ModuleInstance) {
            return ModuleInstance.destroy();
        });
    };
    return ModuleService;
}());
module.exports = ModuleService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/module-service.js.map
