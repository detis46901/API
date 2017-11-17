import Sequelize = require('sequelize');
import RoleModel = require('../models/role-model');


class RoleService {

    getList(searchValue: string): Promise<RoleModel.RoleInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (searchValue) {
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: `%${searchValue}%` } },
                    { lastName: { $iLike: `%${searchValue}%` } },
                    { email: { $iLike: `%${searchValue}%` } },
                ]
            }
        }
        
        return RoleModel.Model.findAll(findOptions);
    }

    getrolesgroupsdepartments(searchValue: string): Promise<RoleModel.RoleInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'role'
            ]
        };

        if (searchValue) {
            findOptions.where = {
                $or: [
                    { firstName: { $iLike: `%${searchValue}%` } },
                    { lastName: { $iLike: `%${searchValue}%` } },
                    { email: { $iLike: `%${searchValue}%` } },
                ]
            }
        }
        
        return RoleModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<RoleModel.RoleInstance> {
        return RoleModel.Model.findById(rowID);
    }

    getByGroup(groupID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'groupID'
            ]
        };

        if (groupID) {
            findOptions.where = {
                $and: [
                    {groupID: groupID}
                ]
            }
        }

        return RoleModel.Model.findAll(findOptions);
    }

    create(request: App.Role): Promise<RoleModel.RoleInstance> {
        console.log("made it to the API")
        return RoleModel.Model.create(request);
    }

    update(request: App.Role): Promise<RoleModel.RoleInstance> {
        
        return <any>(RoleModel.Model.findById(request.ID).then((RoleInstance) => {

            RoleInstance.role = request.role;
            RoleInstance.active = request.active;

            return RoleInstance.save();
        }));
    }

    delete(ID: number) {

        return RoleModel.Model.findById(ID).then((RoleInstance) => {

            return RoleInstance.destroy();

        });
    }

}

export = RoleService;