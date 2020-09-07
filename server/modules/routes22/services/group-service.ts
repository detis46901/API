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
        
        return GroupModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<GroupModel.GroupInstance> {
        return GroupModel.model.findByPk(rowID);
    }

    create(request: App.Group): Promise<GroupModel.GroupInstance> {
        return GroupModel.model.create(request);
    }

    update(request: App.Group): Promise<GroupModel.GroupInstance> {
        
        return <any>(GroupModel.model.findByPk(request.ID).then((GroupInstance) => {

            GroupInstance.name = request.name;
            GroupInstance.description = request.description;

            return GroupInstance.save();
        }));
    }

    delete(rowID: number) {

        return GroupModel.model.findByPk(rowID).then((GroupInstance) => {

            return GroupInstance.destroy();

        });
    }

}

export = GroupService;