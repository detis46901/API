"use strict";
var Sequelize = require('sequelize');
var GroupMemberModel = require('../models/group-member-model');
var UserModel = require('../models/user-model');
var GroupModel = require('../models/group-model');
var GroupMemberService = (function () {
    function GroupMemberService() {
    }
    GroupMemberService.prototype.getList = function (searchValue) {
        return GroupMemberModel.model.findAll();
    };
    GroupMemberService.prototype.getByUser = function (userID) {
        var findOptions = {
            order: [
                'ID'
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
        findOptions.include = [GroupModel.model];
        return GroupMemberModel.model.findAll(findOptions);
        var _a;
    };
    GroupMemberService.prototype.getByGroup = function (groupID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = (_a = {},
                _a[Sequelize.Op.and] = [
                    { groupID: groupID }
                ],
                _a
            );
        }
        findOptions.include = [UserModel.model];
        return GroupMemberModel.model.findAll(findOptions);
        var _a;
    };
    GroupMemberService.prototype.get = function (rowID) {
        return GroupMemberModel.model.findByPk(rowID);
    };
    GroupMemberService.prototype.create = function (request) {
        return GroupMemberModel.model.create(request);
    };
    GroupMemberService.prototype.delete = function (ID) {
        return GroupMemberModel.model.findByPk(ID).then(function (GroupMemberInstance) {
            return GroupMemberInstance.destroy();
        });
    };
    return GroupMemberService;
}());
module.exports = GroupMemberService;

//# sourceMappingURL=../../../source-maps/modules/users/services/group-member-service.js.map
