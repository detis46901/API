"use strict";
var ServerModel = require('../models/servers-model');
var ServerService = (function () {
    function ServerService() {
    }
    ServerService.prototype.getList = function (ServerID) {
        var findOptions = {
            order: [
                'ID'
            ]
        };
        return ServerModel.model.findAll(findOptions);
    };
    ServerService.prototype.get = function (rowID) {
        return ServerModel.model.findByPk(rowID);
    };
    ServerService.prototype.create = function (request) {
        return ServerModel.model.create(request);
    };
    ServerService.prototype.update = function (request) {
        return (ServerModel.model.findByPk(request.ID).then(function (ServerInstance) {
            ServerInstance.serverName = request.serverName;
            ServerInstance.serverType = request.serverType;
            ServerInstance.serverURL = request.serverURL;
            return ServerInstance.save();
        }));
    };
    ServerService.prototype.delete = function (ID) {
        return ServerModel.model.findByPk(ID).then(function (ServerInstance) {
            return ServerInstance.destroy();
        });
    };
    return ServerService;
}());
module.exports = ServerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/servers-service.js.map
