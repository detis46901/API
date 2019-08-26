"use strict";
var ModulePermissionService = require('../services/module-permission-service');
var GroupMemberService = require('../../users/services/group-member-service');
var ModulePermissions = (function () {
    function ModulePermissions() {
        this.finalResponse = new Array();
        this.groups = new Array();
        this.groupMemberService = new GroupMemberService;
        this.modulePermissionService = new ModulePermissionService;
    }
    ModulePermissions.prototype.getPermissions = function (userID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupMemberService.getByUser(userID).then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    var gg = new Array();
                    _this.groups.push(result[i].groupID);
                }
                _this.modulePermissionService.getByUserAndGroup(userID, _this.groups).then(function (final) {
                    resolve(final);
                });
            });
        });
        return promise;
    };
    return ModulePermissions;
}());
exports.ModulePermissions = ModulePermissions;

//# sourceMappingURL=../../../source-maps/modules/feature modules/controllers/module-permissions.js.map
