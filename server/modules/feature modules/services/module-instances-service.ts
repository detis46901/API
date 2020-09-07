import Sequelize = require('sequelize');
import ModuleInstancesModel = require('../models/module-instances-model');
import ModuleModel = require('../models/module-model')

class ModuleInstancesService {
    getList(searchValue: string): Promise<ModuleInstancesModel.ModuleInstancesInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
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

        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        var findOptions: Sequelize.FindOptions = {}
        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.findByPk(rowID, findOptions);
    }

    create(request: App.ModuleInstances): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        var findOptions: Sequelize.FindOptions = {}
        findOptions.include = [ModuleModel.model];
        return ModuleInstancesModel.model.create(request, findOptions);
    }

    update(request: App.ModuleInstances): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        return <any>(ModuleInstancesModel.model.findByPk(request.ID).then((ModuleInstance) => {

            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            ModuleInstance.settings = request.settings
            return ModuleInstance.save();
        }));
    }

    delete(ID: number) {
        return ModuleInstancesModel.model.findByPk(ID).then((ModuleInstance) => {
            return ModuleInstance.destroy();

        });
    }
}

export = ModuleInstancesService;