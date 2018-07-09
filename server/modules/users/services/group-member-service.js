"use strict";
var GroupMemberModel = require('../models/group-member-model');
var UserModel = require('../models/user-model');
var GroupModel = require('../models/group-model');
var GroupMemberService = (function () {
    function GroupMemberService() {
    }
    GroupMemberService.prototype.getList = function (searchValue) {
        return GroupMemberModel.Model.findAll();
    };
    GroupMemberService.prototype.getByUser = function (userID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            };
        }
        findOptions.include = [GroupModel.Model];
        return GroupMemberModel.Model.findAll(findOptions);
    };
    GroupMemberService.prototype.getByGroup = function (groupID) {
        console.log(groupID);
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = {
                $and: [
                    { groupID: groupID }
                ]
            };
        }
        findOptions.include = [UserModel.Model];
        return GroupMemberModel.Model.findAll(findOptions);
    };
    GroupMemberService.prototype.get = function (rowID) {
        return GroupMemberModel.Model.findById(rowID);
    };
    GroupMemberService.prototype.create = function (request) {
        return GroupMemberModel.Model.create(request);
    };
    GroupMemberService.prototype.delete = function (ID) {
        return GroupMemberModel.Model.findById(ID).then(function (GroupMemberInstance) {
            return GroupMemberInstance.destroy();
        });
    };
    return GroupMemberService;
}());
module.exports = GroupMemberService;

//# sourceMappingURL=../../../source-maps/modules/users/services/group-member-service.js.map
