"use strict";
var GroupMemberModel = require('../models/group-member-model');
var GroupMemberService = (function () {
    function GroupMemberService() {
    }
    GroupMemberService.prototype.getList = function (searchValue) {
        return GroupMemberModel.Model.findAll();
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
