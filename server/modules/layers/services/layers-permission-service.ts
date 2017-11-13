import Sequelize = require('sequelize');
import LayerPermissionModel = require('../models/layers-permission-model');
import LayerModel = require('../models/layers-admin-model')


class LayerPermissionService {
    getList(layerAdminID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (layerAdminID) {
            findOptions.where = {
                $and: [
                    { layerAdminID: layerAdminID}
                ]
            }
        }

        findOptions.include = [LayerModel.Model]
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getUserLayer(userID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID}
                ]
            }
        }

        findOptions.include = [LayerModel.Model]
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    get(ID: number): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.findById(ID);
    }

    create(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.create(request);
    }

    update(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        
        return <any>(LayerPermissionModel.Model.findById(request.ID).then((LayerPermissionInstance) => {

            LayerPermissionInstance.layerAdminID = request.layerAdminID;
            LayerPermissionInstance.userID = request.userID;
            LayerPermissionInstance.edit = request.edit;

            return LayerPermissionInstance.save();
        }));
    }

    delete(ID: number) {

        return LayerPermissionModel.Model.findById(ID).then((LayerPermissionInstance) => {
            console.log(LayerPermissionInstance)
            return LayerPermissionInstance.destroy();

        });
    }

}

export = LayerPermissionService;