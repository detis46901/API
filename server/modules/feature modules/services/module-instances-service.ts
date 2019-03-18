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
                $or: [
                    { firstName: { $iLike: `%${searchValue}%` } },
                    { lastName: { $iLike: `%${searchValue}%` } },
                    { email: { $iLike: `%${searchValue}%` } },
                ]
            }
        }
        
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        var findOptions: Sequelize.FindOptions = {}
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.findById(rowID, findOptions);
    }

    create(request: App.ModuleInstances): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        var findOptions: Sequelize.FindOptions = {}
        findOptions.include = [ModuleModel.Model];
        return ModuleInstancesModel.Model.create(request, findOptions);
    }

    update(request: App.ModuleInstances): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        
        return <any>(ModuleInstancesModel.Model.findById(request.ID).then((ModuleInstance) => {

            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            ModuleInstance.settings = request.settings
            return ModuleInstance.save();
        }));
    }

    delete(ID: number) {

        return ModuleInstancesModel.Model.findById(ID).then((ModuleInstance) => {
            return ModuleInstance.destroy();

        });
    }

}

export = ModuleInstancesService;