"use strict";
var Sequelize = require('sequelize');
var GroupModel = require('../models/group-model');
var GroupService = (function () {
    function GroupService() {
    }
    GroupService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'name'
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
        return GroupModel.model.findAll(findOptions);
        var _a, _b, _c, _d;
    };
    GroupService.prototype.get = function (rowID) {
        return GroupModel.model.findByPk(rowID);
    };
    GroupService.prototype.create = function (request) {
        return GroupModel.model.create(request);
    };
    GroupService.prototype.update = function (request) {
        return (GroupModel.model.findByPk(request.ID).then(function (GroupInstance) {
            GroupInstance.name = request.name;
            GroupInstance.description = request.description;
            return GroupInstance.save();
        }));
    };
    GroupService.prototype.delete = function (rowID) {
        return GroupModel.model.findByPk(rowID).then(function (GroupInstance) {
            return GroupInstance.destroy();
        });
    };
    return GroupService;
}());
module.exports = GroupService;

//# sourceMappingURL=../../../source-maps/modules/users/services/group-service.js.map
