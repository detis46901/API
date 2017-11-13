import Sequelize = require('sequelize');
import LayerAdminModel = require('../models/layers-admin-model');
import ServerModel = require ('../models/servers-model')


class LayerAdminService {
    getList(searchValue: string): Promise<LayerAdminModel.LayerAdminInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (searchValue) {
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: `%${searchValue}%` } },
                    { lastName: { $iLike: `%${searchValue}%` } },
                    { email: { $iLike: `%${searchValue}%` } },
                ]
            }
        }
        
         findOptions.include = [ServerModel.Model]
        return LayerAdminModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<LayerAdminModel.LayerAdminInstance> {
        return LayerAdminModel.Model.findById(rowID);
    }

    create(request: App.LayerAdmin): Promise<LayerAdminModel.LayerAdminInstance> {
        console.log("Creating layer, request= " + request.layerName)
        return LayerAdminModel.Model.create(request);
    }

    update(request: App.LayerAdmin): Promise<LayerAdminModel.LayerAdminInstance> {
        
        return <any>(LayerAdminModel.Model.findById(request.ID).then((LayerAdminInstance) => {

            LayerAdminInstance.layerName = request.layerName;
            LayerAdminInstance.layerType = request.layerType;
            LayerAdminInstance.serverID = request.serverID;
            LayerAdminInstance.layerService = request.layerService;
            LayerAdminInstance.layerIdent = request.layerIdent;
            LayerAdminInstance.layerFormat = request.layerFormat;
            LayerAdminInstance.layerDescription = request.layerDescription;
            LayerAdminInstance.layerGeom = request.layerGeom;
            console.log("API layeradmin service")

            return LayerAdminInstance.save();
        }));
    }

    delete(ID: number) {

        return LayerAdminModel.Model.findById(ID).then((LayerAdminInstance) => {
            return LayerAdminInstance.destroy();

        });
    }

}

export = LayerAdminService;