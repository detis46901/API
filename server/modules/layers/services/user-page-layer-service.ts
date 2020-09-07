import Sequelize = require('sequelize');
import UserPageLayerModel = require('../models/user-page-layer-model');
import PageModel = require('../../users/models/page-model')
import LayerModel = require('../models/layers-model')
import ServerModel = require ('../models/servers-model')
import UserModel = require('../../users/models/user-model');
import UserPageInstanceModel = require('../../feature modules/models/user-page-instance-model')
import ModuleInstanceModel = require ('../../../modules/feature modules/models/module-instances-model');

class UserPageLayerService {

    getList(pageID: number): Promise<UserPageLayerModel.UserPageLayerInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (pageID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { pageID: pageID}
                ]
            }
        }
        return UserPageLayerModel.model.findAll(findOptions);
    }

    
    getPageLayers(pageID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'layerOrder'
            ]
        };

        if (pageID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userPageID: pageID}
                ]
            }
        }
        findOptions.include = [PageModel.model, LayerModel.model, UserPageInstanceModel.model]
        return UserPageLayerModel.model.findAll({order: ['layerOrder'], where: {[Sequelize.Op.and]: [{ userPageID: pageID}]}, include: [{model: PageModel.model}, {model: UserPageInstanceModel.model, include: [ModuleInstanceModel.model]}, {model: LayerModel.model, include: [ServerModel.model]}]})
    }

    getUserLayer(userID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'userID'
            ]
        };

        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }

        //return UserPageLayerModel.model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userID: userID}]}, include: [{model: UserModel.model}, {model: LayerModel.model}, {model: PageModel.model}]});
        return UserPageLayerModel.model.findAll(findOptions);
    }

    getByLayer(layerID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'layerID'
            ]
        };

        if (layerID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    {layerID: layerID}
                ]
            }
        }

        return UserPageLayerModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserPageLayerModel.UserPageLayerInstance> {
        return UserPageLayerModel.model.findByPk(rowID);
    }

    create(request: App.UserPageLayer): Promise<UserPageLayerModel.UserPageLayerInstance> {
        return UserPageLayerModel.model.create(request);
    }

    update(request: App.UserPageLayer): Promise<UserPageLayerModel.UserPageLayerInstance> {
        
        return <any>(UserPageLayerModel.model.findByPk(request.ID).then((UserPageLayerInstance) => {
            UserPageLayerInstance.layerID = request.layerID;
            UserPageLayerInstance.userID = request.userID;
            UserPageLayerInstance.defaultON = request.defaultON;
            UserPageLayerInstance.style = request.style;
            UserPageLayerInstance.layerOrder = request.layerOrder
            return UserPageLayerInstance.save();
        }));
    }

    delete(ID: number) {
        return UserPageLayerModel.model.findByPk(ID).then((UserPageLayerInstance) => {

            return UserPageLayerInstance.destroy();

        });
    }
}

export = UserPageLayerService;