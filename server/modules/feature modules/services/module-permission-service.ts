import Sequelize = require('sequelize');
import ModulePermissionModel = require('../models/module-permission-model');
import ModuleInstance = require('../models/module-instances-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
import ModulesModel = require('../models/module-model')
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
                [Sequelize.Op.and]: [
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
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll({include: [{model: ModuleInstance.Model, include:[ModulesModel.Model]}, {model: UserModel.Model}, {model: GroupModel.Model}]});
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
        findOptions.include = [ModuleInstance.Model, UserModel.Model, GroupModel.Model];
        return ModulePermissionModel.Model.findAll({include: [{model: ModuleInstance.Model, include:[ModulesModel.Model]}, {model: UserModel.Model}, {model: GroupModel.Model}]});
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
                [Sequelize.Op.or]: [
                {groupID: {[Sequelize.Op.or]:[groups]}},
                {userID: userID}
        ]}
        }
        findOptions.include =[{model: ModuleInstance.Model, include:[ModulesModel.Model]}, {model: UserModel.Model}, {model: GroupModel.Model}];
        return ModulePermissionModel.Model.findAll(findOptions)
    }

    get(ID: number): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.Model.findByPk(ID);
    }

    create(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {
        return ModulePermissionModel.Model.create(request);
    }

    update(request: App.ModulePermission): Promise<ModulePermissionModel.ModulePermissionInstance> {     
        return <any>(ModulePermissionModel.Model.findByPk(request.ID).then((ModulePermissionInstance) => {
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
        return ModulePermissionModel.Model.findByPk(ID).then((ModulePermissionInstance) => {
            return ModulePermissionInstance.destroy();
        });
    }
}

export = ModulePermissionService;