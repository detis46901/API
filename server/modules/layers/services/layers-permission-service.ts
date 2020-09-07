import Sequelize = require('sequelize');
import LayerPermissionModel = require('../models/layers-permission-model');
import LayerModel = require('../models/layers-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
import ServerModel = require('../models/servers-model')
const Op = Sequelize.or


class LayerPermissionService {
    getList(): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        return LayerPermissionModel.model.findAll();
    }

    getByLayer(layerID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (layerID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { layerID: layerID }
                ]
            }
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
    }

    getByUser(userID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID }
                ]
            }
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };
        if (groupID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { groupID: groupID }
                ]
            }
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions);
    }

    getByUserAndGroup(userID: number, groups: number[]): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        }
        if (userID) {
            findOptions.order = ['ID']
            findOptions.where = {
                [Sequelize.Op.or]: [
                    { groupID: { [Sequelize.Op.or]: [groups] } },
                    { userID: userID }
                ]
            }
        }
        findOptions.include = [{ model: LayerModel.model, include: [ServerModel.model] }, UserModel.model, GroupModel.model];
        return LayerPermissionModel.model.findAll(findOptions)
    }

    get(ID: number): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.model.findByPk(ID);
    }

    create(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.model.create(request);
    }

    update(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return <any>(LayerPermissionModel.model.findByPk(request.ID).then((LayerPermissionInstance) => {
            //Probably should disallow foreign key editing. Create new entry if need new user/layer permission.
            //LayerPermissionInstance.layerID = request.layerID;
            //LayerPermissionInstance.userID = request.userID;
            LayerPermissionInstance.edit = request.edit;
            LayerPermissionInstance.delete = request.delete;
            LayerPermissionInstance.owner = request.owner;
            LayerPermissionInstance.canGrant = request.canGrant;
            LayerPermissionInstance.grantedBy = request.grantedBy;
            LayerPermissionInstance.comments = request.comments;
            return LayerPermissionInstance.save();
        }));
    }

    delete(ID: number) {
        return LayerPermissionModel.model.findByPk(ID).then((LayerPermissionInstance) => {
            return LayerPermissionInstance.destroy();
        });
    }
}

export = LayerPermissionService;