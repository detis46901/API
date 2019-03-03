import Sequelize = require('sequelize');
import ModuleInstancesModel = require('../models/module-instances-model');


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
        
        return ModuleInstancesModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        return ModuleInstancesModel.Model.findById(rowID);
    }

    create(request: App.ModuleInstances): Promise<ModuleInstancesModel.ModuleInstancesInstance> {
        return ModuleInstancesModel.Model.create(request);
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