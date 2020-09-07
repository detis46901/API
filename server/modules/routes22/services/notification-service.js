"use strict";
var Sequelize = require('sequelize');
var NotificationModel = require('../models/notification-model');
//import ParentService = require('../../parent-service');
var NotificationService = (function () {
    function NotificationService() {
    }
    NotificationService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'name'
            ]
        };
        if (searchValue) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.or] = [
                    { name: (_b = {}, _b[Sequelize.Op.iLike] = "%" + searchValue + "%", _b) }
                ],
                _a
            );
        }
        return NotificationModel.model.findAll(findOptions);
        var _a, _b;
    };
    NotificationService.prototype.getByUser = function (userID) {
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
        return NotificationModel.model.findAll(findOptions);
        var _a;
    };
    NotificationService.prototype.getByType = function (objectType) {
        var findOptions = {
            order: [
                'objectType'
            ]
        };
        if (objectType) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { objectType: objectType }
                ],
                _a
            );
        }
        return NotificationModel.model.findAll(findOptions);
        var _a;
    };
    NotificationService.prototype.getBySource = function (sourceID) {
        var findOptions = {
            order: [
                'sourceID'
            ]
        };
        if (sourceID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { sourceID: sourceID }
                ],
                _a
            );
        }
        return NotificationModel.model.findAll(findOptions);
        var _a;
    };
    NotificationService.prototype.get = function (rowID) {
        return NotificationModel.model.findByPk(rowID);
    };
    NotificationService.prototype.create = function (request) {
        return NotificationModel.model.create(request);
    };
    NotificationService.prototype.update = function (request) {
        return (NotificationModel.model.findByPk(request.ID).then(function (NotificationInstance) {
            NotificationInstance.userID = request.userID;
            NotificationInstance.name = request.name;
            NotificationInstance.description = request.description;
            NotificationInstance.link = request.link;
            NotificationInstance.priority = request.priority;
            NotificationInstance.read = request.read;
            return NotificationInstance.save();
        }));
    };
    NotificationService.prototype.delete = function (ID) {
        return NotificationModel.model.findByPk(ID).then(function (NotificationInstance) {
            return NotificationInstance.destroy();
        });
    };
    return NotificationService;
}());
module.exports = NotificationService;

//# sourceMappingURL=../../../source-maps/modules/routes22/services/notification-service.js.map
