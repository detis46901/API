import Sequelize = require('sequelize');
import ModuleModel = require('../models/module-model');


class ModuleService {
    getList(searchValue: string): Promise<ModuleModel.ModuleInstance[]> {

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
        
        return ModuleModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<ModuleModel.ModuleInstance> {
        return ModuleModel.Model.findById(rowID);
    }

    create(request: App.Module): Promise<ModuleModel.ModuleInstance> {
        return ModuleModel.Model.create(request);
    }

    update(request: App.Module): Promise<ModuleModel.ModuleInstance> {
        
        return <any>(ModuleModel.Model.findById(request.ID).then((ModuleInstance) => {

            ModuleInstance.identity = request.identity;
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            return ModuleInstance.save();
        }));
    }

    delete(ID: number) {

        return ModuleModel.Model.findById(ID).then((ModuleInstance) => {
            return ModuleInstance.destroy();

        });
    }

}

export = ModuleService;