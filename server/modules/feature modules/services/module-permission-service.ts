import Sequelize = require('sequelize');
import ModulePermissionModel = require('../models/module-permission-model');
import ModuleInstance = require('../models/module-instances-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
import ModulesModel = require('../models/module-model')
const Op = Sequelize.or

class ModulePermissionService {
    getList(): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        return ModulePermissionModel.model.findAll();
    }
    
    getByInstance(instanceID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (instanceID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { moduleInstanceID: instanceID}
                ]
            }
        }
        findOptions.include = [ModuleInstance.model, UserModel.model, GroupModel.model];
        return ModulePermissionModel.model.findAll(findOptions);
    }

    getByUser(userID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }
        findOptions.include = [ModuleInstance.model, UserModel.model, GroupModel.model];
        return ModulePermissionModel.model.findAll({include: [{model: ModuleInstance.model, include:[ModulesModel.model]}, {model: UserModel.model}, {model: GroupModel.model}]});
    }

    getByGroup(groupID: number): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { groupID: groupID}
                ]
            }
        }
        findOptions.include = [ModuleInstance.model, UserModel.model, GroupModel.model];
        return ModulePermissionModel.model.findAll({include: [{model: ModuleInstance.model, include:[ModulesModel.model]}, {model: UserModel.model}, {model: GroupModel.model}]});
    }

    getByUserAndGroup(userID: number, groups:number[]): Promise<ModulePermissionModel.ModulePermissionInstance[]> {
        console.log("getByUserAndGroups", groups)
        const op = Sequelize.or
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        }
        if (userID) {
            findOptions.where = {
                [Sequelize.Op.or]: [
                {groupID: {[Sequelize.Op.or]:[groups]}},
                {userID: userID}
        ]}
        }
        findOptions.include =[{model: ModuleInstance.model, include:[ModulesModel.model]}, {model: UserModel.model}, {model: GroupModel.model}];
        return ModulePermissionModel.model.findAll(findOptions)
    }

    get(ID: number): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.model.findByPk(ID);
    }

    create(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.model.create(request);
    }

    update(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {     
        return <any>(ModulePermissionModel.model.findByPk(request.ID).then((ModulePermissionInstance) => {
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
        return ModulePermissionModel.model.findByPk(ID).then((ModulePermissionInstance) => {
            return ModulePermissionInstance.destroy();
        });
    }
}

export = ModulePermissionService;