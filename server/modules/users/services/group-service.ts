import Sequelize = require('sequelize');
import GroupModel = require('../models/group-model');

class GroupService {

    getList(searchValue: string): Promise<GroupModel.GroupInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'name'
            ]
        };

        if (searchValue) {
            findOptions.where = {
                [Sequelize.Op.or]: [
                    { firstName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { lastName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { email: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                ]
            }
        }
        
        return GroupModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<GroupModel.GroupInstance> {
        return GroupModel.Model.findByPk(rowID);
    }

    create(request: App.Group): Promise<GroupModel.GroupInstance> {
        return GroupModel.Model.create(request);
    }

    update(request: App.Group): Promise<GroupModel.GroupInstance> {
        
        return <any>(GroupModel.Model.findByPk(request.ID).then((GroupInstance) => {

            GroupInstance.name = request.name;
            GroupInstance.description = request.description;

            return GroupInstance.save();
        }));
    }

    delete(rowID: number) {

        return GroupModel.Model.findByPk(rowID).then((GroupInstance) => {

            return GroupInstance.destroy();

        });
    }

}

export = GroupService;