import Sequelize = require('sequelize');
import GroupModel = require('../models/group-model');
import DepartmentModel = require('../models/department-model');


class GroupService {

    getList(searchValue: string): Promise<GroupModel.GroupInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'group'
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
        
        return GroupModel.Model.findAll(findOptions);
    }

    getdepartment(ID: number): any {
        return GroupModel.Model.findAll({ include: [ DepartmentModel.Model ]})
    }

    get(rowID: number): Promise<GroupModel.GroupInstance> {
        return GroupModel.Model.findById(rowID);
    }

    create(request: App.Group): Promise<GroupModel.GroupInstance> {
        return GroupModel.Model.create(request);
    }

    update(request: App.Group): Promise<GroupModel.GroupInstance> {
        
        return <any>(GroupModel.Model.findById(request.ID).then((GroupInstance) => {

            GroupInstance.group = request.group;
            GroupInstance.active = request.active;

            return GroupInstance.save();
        }));
    }

    delete(rowID: number) {

        return GroupModel.Model.findById(rowID).then((GroupInstance) => {

            return GroupInstance.destroy();

        });
    }

}

export = GroupService;