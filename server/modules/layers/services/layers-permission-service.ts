import Sequelize = require('sequelize');
import LayerPermissionModel = require('../models/layers-permission-model');
import LayerModel = require('../models/layers-model')
import UserModel = require('../../users/models/user-model')
import GroupModel = require('../../users/models/group-model')
import ServerModel = require ('../models/servers-model')
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
                [Sequelize.Op.and]: [
                    { layerID: layerID}
                ]
            }
        }

        findOptions.include = [{model: LayerModel.Model, include: [ServerModel.Model]}, UserModel.Model, GroupModel.Model];
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
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }

        findOptions.include = [{model: LayerModel.Model, include: [ServerModel.Model]}, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        //console.log(groupID)
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

        findOptions.include = [{model: LayerModel.Model, include: [ServerModel.Model]}, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions);
    }

    getByUserAndGroup(userID: number, groups:number[]): Promise<LayerPermissionModel.LayerPermissionInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        }

        if (userID) {
            findOptions.order = ['ID']
            findOptions.where = {
                [Sequelize.Op.or]: [
                {groupID: {[Sequelize.Op.or]:[groups]}},
                {userID: userID}
        ]}
        }

        findOptions.include = [{model: LayerModel.Model, include: [ServerModel.Model]}, UserModel.Model, GroupModel.Model];
        return LayerPermissionModel.Model.findAll(findOptions)
    }

    get(ID: number): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.findByPk(ID);
    }

    create(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        return LayerPermissionModel.Model.create(request);
    }

    update(request: App.LayerPermission): Promise<LayerPermissionModel.LayerPermissionInstance> {
        
        return <any>(LayerPermissionModel.Model.findByPk(request.ID).then((LayerPermissionInstance) => {

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

        return LayerPermissionModel.Model.findByPk(ID).then((LayerPermissionInstance) => {
            return LayerPermissionInstance.destroy();

        });
    }

}

export = LayerPermissionService;