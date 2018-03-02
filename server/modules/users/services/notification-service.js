"use strict";
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
            findOptions.where = {
                $or: [
                    { name: { $iLike: "%" + searchValue + "%" } }
                ]
            };
        }
        return NotificationModel.Model.findAll(findOptions);
    };
    NotificationService.prototype.getByUser = function (userID) {
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
        return NotificationModel.Model.findAll(findOptions);
    };
    NotificationService.prototype.get = function (rowID) {
        return NotificationModel.Model.findById(rowID);
    };
    NotificationService.prototype.create = function (request) {
        return NotificationModel.Model.create(request);
    };
    NotificationService.prototype.update = function (request) {
        return (NotificationModel.Model.findById(request.ID).then(function (NotificationInstance) {
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
        return NotificationModel.Model.findById(ID).then(function (NotificationInstance) {
            return NotificationInstance.destroy();
        });
    };
    return NotificationService;
}());
module.exports = NotificationService;

//# sourceMappingURL=../../../source-maps/modules/users/services/notification-service.js.map
