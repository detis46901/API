"use strict";
var PageModel = require('../models/page-model');
var PageService = (function () {
    function PageService() {
    }
    PageService.prototype.getList = function (userID) {
        var findOptions = {
            order: [
                'pageOrder'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            };
        }
        return PageModel.Model.findAll(findOptions);
    };
    PageService.prototype.getDefault = function (userID) {
        var findOptions = {
            order: [
                'userID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID },
                    { default: true }
                ]
            };
        }
        return PageModel.Model.findAll(findOptions);
    };
    PageService.prototype.get = function (rowID) {
        return PageModel.Model.findById(rowID);
    };
    PageService.prototype.create = function (request) {
        return PageModel.Model.create(request);
    };
    PageService.prototype.update = function (request) {
        return (PageModel.Model.findById(request.ID).then(function (PageInstance) {
            PageInstance.userID = request.userID;
            PageInstance.page = request.page;
            PageInstance.pageOrder = request.pageOrder;
            PageInstance.default = request.default;
            PageInstance.active = request.active;
            return PageInstance.save();
        }));
    };
    PageService.prototype.delete = function (rowID) {
        return PageModel.Model.findById(rowID).then(function (PageInstance) {
            return PageInstance.destroy();
        });
    };
    return PageService;
}());
module.exports = PageService;

//# sourceMappingURL=../../../source-maps/modules/users/services/page-service.js.map
