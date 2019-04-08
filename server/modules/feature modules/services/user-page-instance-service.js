"use strict";
var Sequelize = require('sequelize');
var UserPageInstanceModel = require('../models/user-page-instance-model');
var PageModel = require('../../users/models/page-model');
var InstanceModel = require('../models/module-instances-model');
var ModuleModel = require('../models/module-model');
var UserPageInstanceService = (function () {
    function UserPageInstanceService() {
    }
    UserPageInstanceService.prototype.getList = function (pageID) {
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
        return UserPageInstanceModel.Model.findAll(findOptions);
        var _a;
    };
    UserPageInstanceService.prototype.getPageInstances = function (pageID) {
        var findOptions = {
            order: [
                'pageID'
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
        findOptions.include = [PageModel.Model, InstanceModel.Model];
        return UserPageInstanceModel.Model.findAll({ order: ['ID'], where: (_b = {}, _b[Sequelize.Op.and] = [{ userPageID: pageID }], _b), include: [{ model: PageModel.Model }, { model: InstanceModel.Model, include: [ModuleModel.Model] }] });
        var _a, _b;
    };
    UserPageInstanceService.prototype.getUserInstance = function (userID) {
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
        //return UserPageLayerModel.Model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userID: userID}]}, include: [{model: UserModel.Model}, {model: LayerModel.Model}, {model: PageModel.Model}]});
        return UserPageInstanceModel.Model.findAll(findOptions);
        var _a;
    };
    UserPageInstanceService.prototype.getByInstance = function (instanceID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (instanceID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { moduleInstanceID: instanceID }
                ],
                _a
            );
        }
        return UserPageInstanceModel.Model.findAll(findOptions);
        var _a;
    };
    UserPageInstanceService.prototype.get = function (rowID) {
        return UserPageInstanceModel.Model.findByPk(rowID);
    };
    UserPageInstanceService.prototype.create = function (request) {
        return UserPageInstanceModel.Model.create(request);
    };
    UserPageInstanceService.prototype.update = function (request) {
        return (UserPageInstanceModel.Model.findByPk(request.ID).then(function (UserPageInstanceInstance) {
            UserPageInstanceInstance.moduleInstanceID = request.moduleInstanceID;
            UserPageInstanceInstance.userID = request.userID;
            UserPageInstanceInstance.defaultON = request.defaultON;
            return UserPageInstanceInstance.save();
        }));
    };
    UserPageInstanceService.prototype.delete = function (ID) {
        return UserPageInstanceModel.Model.findByPk(ID).then(function (UserPageInstanceInstance) {
            return UserPageInstanceInstance.destroy();
        });
    };
    return UserPageInstanceService;
}());
module.exports = UserPageInstanceService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/user-page-instance-service.js.map
