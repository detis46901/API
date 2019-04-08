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
                [Sequelize.Op.or]: [
                    { firstName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { lastName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { email: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                ]
            }
        }
        
         findOptions.include = [ServerModel.Model]
        return LayerModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<LayerModel.LayerInstance> {
        return LayerModel.Model.findByPk(rowID);
    }

    create(request: App.Layer): Promise<LayerModel.LayerInstance> {
        return LayerModel.Model.create(request);
    }

    update(request: App.Layer): Promise<LayerModel.LayerInstance> {
        
        return <any>(LayerModel.Model.findByPk(request.ID).then((LayerInstance) => {

            LayerInstance.layerName = request.layerName;
            LayerInstance.layerType = request.layerType;
            LayerInstance.serverID = request.serverID;
            LayerInstance.layerService = request.layerService;
            LayerInstance.layerIdent = request.layerIdent;
            LayerInstance.layerFormat = request.layerFormat;
            LayerInstance.layerDescription = request.layerDescription;
            LayerInstance.layerGeom = request.layerGeom;
            LayerInstance.defaultStyle = request.defaultStyle;
            return LayerInstance.save();
        }));
    }

    delete(ID: number) {

        return LayerModel.Model.findByPk(ID).then((LayerInstance) => {
            return LayerInstance.destroy();

        });
    }

}

export = LayerService;