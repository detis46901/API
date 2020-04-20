"use strict";
var LayerPermissions = (function () {
    function LayerPermissions(groupMemberService, layerPermissionService) {
        this.groupMemberService = groupMemberService;
        this.layerPermissionService = layerPermissionService;
        this.finalResponse = new Array();
        this.groups = new Array();
    }
    LayerPermissions.prototype.getPermissions = function (userID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.groupMemberService.getByUser(userID).then(function (result) {
                for (var i = 0; i < result.length; i++) {
                    //   let gg = new Array<number>()
                    _this.groups.push(result[i].groupID);
                }
                _this.layerPermissionService.getByUserAndGroup(userID, _this.groups).then(function (final) {
                    var lastLayerID;
                    final.sort(function (leftside, rightside) {
                        if (leftside.layerID < rightside.layerID)
                            return -1;
                        if (leftside.layerID > rightside.layerID)
                            return 1;
                        return 0;
                    });
                    var finalToSend = [];
                    for (var j = 0; j < final.length; j++) {
                        if (final[j].layerID != lastLayerID) {
                            lastLayerID = final[j].layerID;
                            finalToSend.push(final[j]);
                        }
                        else {
                            if (final[j].canGrant == true) {
                                finalToSend[finalToSend.length - 1].canGrant = true;
                            }
                            if (final[j].delete == true) {
                                finalToSend[finalToSend.length - 1].delete = true;
                            }
                            if (final[j].edit == true) {
                                finalToSend[finalToSend.length - 1].edit = true;
                            }
                        }
                    }
                    resolve(finalToSend);
                });
            });
        });
        return promise;
    };
    return LayerPermissions;
}());
exports.LayerPermissions = LayerPermissions;

//# sourceMappingURL=../../../source-maps/modules/layers/controllers/layers-permissions.js.map
