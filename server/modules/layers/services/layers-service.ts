import Sequelize = require('sequelize');
import LayerModel = require('../models/layers-model');
import ServerModel = require ('../models/servers-model')


class LayerService {
    getList(searchValue: string): Promise<LayerModel.LayerInstance[]> {

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
        return LayerModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<LayerModel.LayerInstance> {
        return LayerModel.Model.findById(rowID);
    }

    create(request: App.Layer): Promise<LayerModel.LayerInstance> {
        return LayerModel.Model.create(request);
    }

    update(request: App.Layer): Promise<LayerModel.LayerInstance> {
        
        return <any>(LayerModel.Model.findById(request.ID).then((LayerInstance) => {

            LayerInstance.layerName = request.layerName;
            LayerInstance.layerType = request.layerType;
            LayerInstance.serverID = request.serverID;
            LayerInstance.layerService = request.layerService;
            LayerInstance.layerIdent = request.layerIdent;
            LayerInstance.layerFormat = request.layerFormat;
            LayerInstance.layerDescription = request.layerDescription;
            LayerInstance.layerGeom = request.layerGeom;

            return LayerInstance.save();
        }));
    }

    delete(ID: number) {

        return LayerModel.Model.findById(ID).then((LayerInstance) => {
            return LayerInstance.destroy();

        });
    }

}

export = LayerService;