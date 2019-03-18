"use strict";
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
            findOptions.where = {
                $and: [
                    { pageID: pageID }
                ]
            };
        }
        return UserPageInstanceModel.Model.findAll(findOptions);
    };
    UserPageInstanceService.prototype.getPageInstances = function (pageID) {
        var findOptions = {
            order: [
                'pageID'
            ]
        };
        if (pageID) {
            findOptions.where = {
                $and: [
                    { userPageID: pageID }
                ]
            };
        }
        findOptions.include = [PageModel.Model, InstanceModel.Model];
        return UserPageInstanceModel.Model.findAll({ order: ['ID'], where: { $and: [{ userPageID: pageID }] }, include: [{ model: PageModel.Model }, { model: InstanceModel.Model, include: [ModuleModel.Model] }] });
    };
    UserPageInstanceService.prototype.getUserInstance = function (userID) {
        var findOptions = {
            order: [
                'userID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            };
        }
        //return UserPageLayerModel.Model.findAll({order: ['ID'], where: {$and: [{ userID: userID}]}, include: [{model: UserModel.Model}, {model: LayerModel.Model}, {model: PageModel.Model}]});
        return UserPageInstanceModel.Model.findAll(findOptions);
    };
    UserPageInstanceService.prototype.getByInstance = function (instanceID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (instanceID) {
            findOptions.where = {
                $and: [
                    { moduleInstanceID: instanceID }
                ]
            };
        }
        return UserPageInstanceModel.Model.findAll(findOptions);
    };
    UserPageInstanceService.prototype.get = function (rowID) {
        return UserPageInstanceModel.Model.findById(rowID);
    };
    UserPageInstanceService.prototype.create = function (request) {
        return UserPageInstanceModel.Model.create(request);
    };
    UserPageInstanceService.prototype.update = function (request) {
        return (UserPageInstanceModel.Model.findById(request.ID).then(function (UserPageInstanceInstance) {
            UserPageInstanceInstance.moduleInstanceID = request.moduleInstanceID;
            UserPageInstanceInstance.userID = request.userID;
            UserPageInstanceInstance.defaultON = request.defaultON;
            return UserPageInstanceInstance.save();
        }));
    };
    UserPageInstanceService.prototype.delete = function (ID) {
        return UserPageInstanceModel.Model.findById(ID).then(function (UserPageInstanceInstance) {
            return UserPageInstanceInstance.destroy();
        });
    };
    return UserPageInstanceService;
}());
module.exports = UserPageInstanceService;

//# sourceMappingURL=../../../source-maps/modules/feature modules/services/user-page-instance-service.js.map
