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
        // if (ServerID) {
        //     findOptions.where = {
        //         [Sequelize.Op.and]: [
        //             { ServerID: ServerID}
        //         ]
        //     }
        // }
        //findOptions.include = [ServerModel.Model]
        return ServerModel.Model.findAll(findOptions);
    };
    ServerService.prototype.get = function (rowID) {
        return ServerModel.Model.findByPk(rowID);
    };
    ServerService.prototype.create = function (request) {
        return ServerModel.Model.create(request);
    };
    ServerService.prototype.update = function (request) {
        return (ServerModel.Model.findByPk(request.ID).then(function (ServerInstance) {
            ServerInstance.serverName = request.serverName;
            ServerInstance.serverType = request.serverType;
            ServerInstance.serverURL = request.serverURL;
            return ServerInstance.save();
        }));
    };
    ServerService.prototype.delete = function (ID) {
        return ServerModel.Model.findByPk(ID).then(function (ServerInstance) {
            return ServerInstance.destroy();
        });
    };
    return ServerService;
}());
module.exports = ServerService;

//# sourceMappingURL=../../../source-maps/modules/layers/services/servers-service.js.map
