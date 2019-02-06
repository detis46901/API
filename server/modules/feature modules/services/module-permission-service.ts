import Sequelize = require('sequelize');
import ModulePermissionModel = require('../models/module-permission-model');
import ModuleInstance = require('../models/module-instances-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
const Op = Sequelize.or


class ModulePermissionService {
    getList(): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        return ModulePermissionModel.Model.findAll();
    }
    
    getByInstance(instanceID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (instanceID) {
            findOptions.where = {
                $and: [
                    { moduleInstanceID: instanceID}
                ]
            }
        }

        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    }

    getByUser(userID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {

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

        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        console.log(groupID)
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (groupID) {
            findOptions.where = {
                $and: [
                    { groupID: groupID}
                ]
            }
        }

        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions);
    }

    getByUserAndGroup(userID: number, groups:number[]): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        const op = Sequelize.or
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        }

        if (userID) {
            findOptions.where = {
                $or: [
                {groupID: {$or:[groups]}},
                {userID: userID}
        ]}
        }

        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll(findOptions)
    }

    get(ID: number): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.Model.findById(ID);
    }

    create(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.Model.create(request);
    }

    update(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {
        
        return <any>(ModulePermissionModel.Model.findById(request.ID).then((ModulePermissionInstance) => {

            ModulePermissionInstance.edit = request.edit;
            ModulePermissionInstance.delete = request.delete;
            ModulePermissionInstance.owner = request.owner;
            ModulePermissionInstance.canGrant = request.canGrant;
            ModulePermissionInstance.grantedBy = request.grantedBy;
            ModulePermissionInstance.comments = request.comments;

            return ModulePermissionInstance.save();
        }));
    }

    delete(ID: number) {

        return ModulePermissionModel.Model.findById(ID).then((ModulePermissionInstance) => {
            return ModulePermissionInstance.destroy();

        });
    }

}

export = ModulePermissionService;