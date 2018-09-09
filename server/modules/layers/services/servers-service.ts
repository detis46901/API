import Sequelize = require('sequelize');
import ServerModel = require('../models/servers-model');

class ServerService {

    getList(ServerID: number): Promise<ServerModel.ServerInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        // if (ServerID) {
        //     findOptions.where = {
        //         $and: [
        //             { ServerID: ServerID}
        //         ]
        //     }
        // }

        //findOptions.include = [ServerModel.Model]
        return ServerModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<ServerModel.ServerInstance> {
        return ServerModel.Model.findById(rowID);
    }

    create(request: App.Server): Promise<ServerModel.ServerInstance> {
        return ServerModel.Model.create(request);
    }

    update(request: App.Server): Promise<ServerModel.ServerInstance> {

        return <any>(ServerModel.Model.findById(request.ID).then((ServerInstance) => {

            ServerInstance.serverName = request.serverName;
            ServerInstance.serverType = request.serverType;
            ServerInstance.serverURL = request.serverURL;

            return ServerInstance.save();
        }));
    }

    delete(ID: number) {

        return ServerModel.Model.findById(ID).then((ServerInstance) => {

            return ServerInstance.destroy();

        });
    }
}

export = ServerService;