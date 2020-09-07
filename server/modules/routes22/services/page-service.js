"use strict";
var Sequelize = require('sequelize');
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
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { userID: userID }
                ],
                _a
            );
        }
        return PageModel.model.findAll(findOptions);
        var _a;
    };
    PageService.prototype.getActiveByUserID = function (userID) {
        var findOptions = {
            order: [
                'pageOrder'
            ]
        };
        if (userID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { userID: userID },
                    { active: true }
                ],
                _a
            );
        }
        return PageModel.model.findAll(findOptions);
        var _a;
    };
    PageService.prototype.getDefault = function (userID) {
        var findOptions = {
            order: [
                'userID'
            ]
        };
        if (userID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { userID: userID },
                    { default: true }
                ],
                _a
            );
        }
        return PageModel.model.findAll(findOptions);
        var _a;
    };
    PageService.prototype.get = function (rowID) {
        return PageModel.model.findByPk(rowID);
    };
    PageService.prototype.create = function (request) {
        return PageModel.model.create(request);
    };
    PageService.prototype.update = function (request) {
        return (PageModel.model.findByPk(request.ID).then(function (PageInstance) {
            PageInstance.userID = request.userID;
            PageInstance.page = request.page;
            PageInstance.pageOrder = request.pageOrder;
            PageInstance.default = request.default;
            PageInstance.active = request.active;
            return PageInstance.save();
        }));
    };
    PageService.prototype.delete = function (ID) {
        return PageModel.model.findByPk(ID).then(function (PageInstance) {
            return PageInstance.destroy();
        });
    };
    return PageService;
}());
module.exports = PageService;

//# sourceMappingURL=../../../source-maps/modules/routes22/services/page-service.js.map
