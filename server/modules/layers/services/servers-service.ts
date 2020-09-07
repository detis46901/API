import Sequelize = require('sequelize');
import ServerModel = require('../models/servers-model');

class ServerService {

    getList(ServerID: number): Promise<ServerModel.ServerInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        return ServerModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<ServerModel.ServerInstance> {
        return ServerModel.model.findByPk(rowID);
    }

    create(request: App.Server): Promise<ServerModel.ServerInstance> {
        return ServerModel.model.create(request);
    }

    update(request: App.Server): Promise<ServerModel.ServerInstance> {
        
        return <any>(ServerModel.model.findByPk(request.ID).then((ServerInstance) => {

            ServerInstance.serverName = request.serverName;
            ServerInstance.serverType = request.serverType;
            ServerInstance.serverURL = request.serverURL;

            return ServerInstance.save();
        }));
    }

    delete(ID: number) {

        return ServerModel.model.findByPk(ID).then((ServerInstance) => {
            return ServerInstance.destroy();
        });
    }
}

export = ServerService;