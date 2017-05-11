import Sequelize = require('sequelize');
import LayerAdminModel = require('../models/layers-admin-model');


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
        
        return LayerAdminModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<LayerAdminModel.LayerAdminInstance> {
        return LayerAdminModel.Model.findById(rowID);
    }

    create(request: App.LayerAdmin): Promise<LayerAdminModel.LayerAdminInstance> {
        return LayerAdminModel.Model.create(request);
    }

    update(request: App.LayerAdmin): Promise<LayerAdminModel.LayerAdminInstance> {
        
        return <any>(LayerAdminModel.Model.findById(request.ID).then((LayerAdminInstance) => {

            LayerAdminInstance.layerName = request.layerName;
            LayerAdminInstance.layerType = request.layerType;
            LayerAdminInstance.layerURL = request.layerURL;
            LayerAdminInstance.layerIdent = request.layerIdent;
            LayerAdminInstance.layerFormat = request.layerFormat;
            LayerAdminInstance.layerDescription = request.layerDescription;

            return LayerAdminInstance.save();
        }));
    }

    delete(rowID: number) {

        return LayerAdminModel.Model.findById(rowID).then((LayerAdminInstance) => {

            return LayerAdminInstance.destroy();

        });
    }

}

export = LayerAdminService;