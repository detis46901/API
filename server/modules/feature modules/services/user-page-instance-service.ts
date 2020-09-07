import Sequelize = require('sequelize');
import UserPageInstanceModel = require('../models/user-page-instance-model');
import PageModel = require('../../users/models/page-model')
import InstanceModel = require('../models/module-instances-model')
import ModuleModel = require ('../models/module-model')

class UserPageInstanceService {

    getList(pageID: number): Promise<UserPageInstanceModel.UserPageInstanceInstance[]> {

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

        return UserPageInstanceModel.model.findAll(findOptions);
    }

    
    getPageInstances(pageID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'pageID'
            ]
        };

        if (pageID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userPageID: pageID}
                ]
            }
        }


    
        findOptions.include = [PageModel.model, InstanceModel.model]

        return UserPageInstanceModel.model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userPageID: pageID}]}, include: [{model: PageModel.model}, {model: InstanceModel.model, include: [ModuleModel.model]}]})
    }

    getUserInstance(userID: number): any {
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
        return UserPageInstanceModel.model.findAll(findOptions);
    }

    getByInstance(instanceID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (instanceID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    {moduleInstanceID: instanceID}
                ]
            }
        }

        return UserPageInstanceModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        return UserPageInstanceModel.model.findByPk(rowID);
    }

    create(request: App.UserPageInstance): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        return UserPageInstanceModel.model.create(request);
    }

    update(request: App.UserPageInstance): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        
        return <any>(UserPageInstanceModel.model.findByPk(request.ID).then((UserPageInstanceInstance) => {

            UserPageInstanceInstance.moduleInstanceID = request.moduleInstanceID;
            UserPageInstanceInstance.userID = request.userID;
            UserPageInstanceInstance.defaultON = request.defaultON;
            
            return UserPageInstanceInstance.save();
        }));
    }

    delete(ID: number) {
        return UserPageInstanceModel.model.findByPk(ID).then((UserPageInstanceInstance) => {

            return UserPageInstanceInstance.destroy();

        });
    }

}

export = UserPageInstanceService;