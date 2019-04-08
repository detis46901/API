import Sequelize = require('sequelize');
import UserPageInstanceModel = require('../models/user-page-instance-model');
import PageModel = require('../../users/models/page-model')
import InstanceModel = require('../models/module-instances-model')
import ModuleModel = require ('../models/module-model')
import UserModel = require('../../users/models/user-model');

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

        return UserPageInstanceModel.Model.findAll(findOptions);
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


    
        findOptions.include = [PageModel.Model, InstanceModel.Model]

        return UserPageInstanceModel.Model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userPageID: pageID}]}, include: [{model: PageModel.Model}, {model: InstanceModel.Model, include: [ModuleModel.Model]}]})
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

        //return UserPageLayerModel.Model.findAll({order: ['ID'], where: {[Sequelize.Op.and]: [{ userID: userID}]}, include: [{model: UserModel.Model}, {model: LayerModel.Model}, {model: PageModel.Model}]});
        return UserPageInstanceModel.Model.findAll(findOptions);
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

        return UserPageInstanceModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        return UserPageInstanceModel.Model.findByPk(rowID);
    }

    create(request: App.UserPageInstance): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        return UserPageInstanceModel.Model.create(request);
    }

    update(request: App.UserPageInstance): Promise<UserPageInstanceModel.UserPageInstanceInstance> {
        
        return <any>(UserPageInstanceModel.Model.findByPk(request.ID).then((UserPageInstanceInstance) => {

            UserPageInstanceInstance.moduleInstanceID = request.moduleInstanceID;
            UserPageInstanceInstance.userID = request.userID;
            UserPageInstanceInstance.defaultON = request.defaultON;
            
            return UserPageInstanceInstance.save();
        }));
    }

    delete(ID: number) {
        return UserPageInstanceModel.Model.findByPk(ID).then((UserPageInstanceInstance) => {

            return UserPageInstanceInstance.destroy();

        });
    }

}

export = UserPageInstanceService;