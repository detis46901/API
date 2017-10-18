import Sequelize = require('sequelize');
import UserPageLayerModel = require('../models/user-page-layer-model');
import PageModel = require('../../users/models/page-model')
import LayerModel = require('../models/layers-admin-model')
import ServerModel = require ('../models/servers-model')

class UserPageLayerService {

    getList(pageID: number): Promise<UserPageLayerModel.UserPageLayerInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'rowID'
            ]
        };

        if (pageID) {
            findOptions.where = {
                $and: [
                    { pageID: pageID}
                ]
            }
        }

        return UserPageLayerModel.Model.findAll(findOptions);
    }

    
    getPageLayers(pageID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (pageID) {
            findOptions.where = {
                $and: [
                    { userPageID: pageID}
                ]
            }
        }


    
        findOptions.include = [PageModel.Model, LayerModel.Model]

        return UserPageLayerModel.Model.findAll({order: ['ID'], where: {$and: [{ userPageID: pageID}]}, include: [{model: PageModel.Model}, {model: LayerModel.Model, include: [ServerModel.Model]}]})
    }

    getUserLayer(userID: number): Promise<UserPageLayerModel.UserPageLayerInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'rowID'
            ]
        };

        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID}
                ]
            }
        }

        return UserPageLayerModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserPageLayerModel.UserPageLayerInstance> {
        return UserPageLayerModel.Model.findById(rowID);
    }

    create(request: App.UserPageLayer): Promise<UserPageLayerModel.UserPageLayerInstance> {
        return UserPageLayerModel.Model.create(request);
    }

    update(request: App.UserPageLayer): Promise<UserPageLayerModel.UserPageLayerInstance> {
        
        return <any>(UserPageLayerModel.Model.findById(request.ID).then((UserPageLayerInstance) => {

            UserPageLayerInstance.layerAdminID = request.layerAdminID;
            UserPageLayerInstance.userID = request.userID;
            UserPageLayerInstance.layerON = request.layerON;

            return UserPageLayerInstance.save();
        }));
    }

    delete(ID: number) {
        console.log("Deleting user page layer")
        return UserPageLayerModel.Model.findById(ID).then((UserPageLayerInstance) => {

            return UserPageLayerInstance.destroy();

        });
    }

}

export = UserPageLayerService;