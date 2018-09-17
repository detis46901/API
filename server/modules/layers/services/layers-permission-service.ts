import Sequelize = require('sequelize');
import LayerPermissionModel = require('../models/layers-permission-model');
import LayerModel = require('../models/layers-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
const Op = Sequelize.or


class LayerPermissionService {
    getList(): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        return LayerPermissionModel.Model.findAll();
    }

    getByLayer(layerID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (layerID) {
            findOptions.where = {
                $and: [
                    { layerID: layerID }
                ]
            }
        }

        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getByUser(userID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (userID) {
            findOptions.where = {
                $and: [
                    { userID: userID }
                ]
            }
        }

        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        console.log(groupID)
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (groupID) {
            findOptions.where = {
                $and: [
                    { groupID: groupID }
                ]
            }
        }

        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getByUserAndGroup(userID: number, groups: number[]): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        const op = Sequelize.or
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        }

        if (userID) {
            findOptions.where = {
                $or: [
                    { groupID: { $or: [groups] } },
                    { userID: userID }
                ]
            }
        }

        findOptions.include = [LayerModel.Model, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions)
    }

    get(ID: number): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.findById(ID);
    }

    create(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.create(request);
    }

    update(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {

        return <any>(LayerPermissionModel.Model.findById(request.ID).then((LayerPermissionInstance) => {

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

        return LayerPermissionModel.Model.findById(ID).then((LayerPermissionInstance) => {
            return LayerPermissionInstance.destroy();

        });
    }

    deleteByLayer(layerID: number) {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (layerID) {
            findOptions.where = {
                $and: [
                    { layerID: layerID }
                ]
            }
        }

        return LayerPermissionModel.Model.find(findOptions).then((LayerPermissionInstance) => {
            return LayerPermissionInstance.destroy();

        });
    }
}

export = LayerPermissionService;