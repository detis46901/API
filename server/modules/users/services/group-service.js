"use strict";
var GroupModel = require('../models/group-model');
var GroupService = (function () {
    function GroupService() {
    }
    GroupService.prototype.getList = function (searchValue) {
        var findOptions = {
            order: [
                'group'
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
        return GroupModel.Model.findAll(findOptions);
    };
    GroupService.prototype.get = function (rowID) {
        return GroupModel.Model.findById(rowID);
    };
    GroupService.prototype.create = function (request) {
        return GroupModel.Model.create(request);
    };
    GroupService.prototype.update = function (request) {
        return (GroupModel.Model.findById(request.ID).then(function (GroupInstance) {
            GroupInstance.name = request.name;
            GroupInstance.description = request.description;
            return GroupInstance.save();
        }));
    };
    GroupService.prototype.delete = function (rowID) {
        return GroupModel.Model.findById(rowID).then(function (GroupInstance) {
            return GroupInstance.destroy();
        });
    };
    return GroupService;
}());
module.exports = GroupService;

//# sourceMappingURL=../../../source-maps/modules/users/services/group-service.js.map
