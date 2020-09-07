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
                [Sequelize.Op.or]: [
                    { firstName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { lastName: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                    { email: { [Sequelize.Op.iLike]: `%${searchValue}%` } },
                ]
            }
        }
        
        return ModuleModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<ModuleModel.ModuleInstance> {
        return ModuleModel.model.findByPk(rowID);
    }

    create(request: App.Module): Promise<ModuleModel.ModuleInstance> {
        return ModuleModel.model.create(request);
    }

    update(request: App.Module): Promise<ModuleModel.ModuleInstance> {
        
        return <any>(ModuleModel.model.findByPk(request.ID).then((ModuleInstance) => {

            ModuleInstance.identity = request.identity;
            ModuleInstance.name = request.name;
            ModuleInstance.description = request.description;
            return ModuleInstance.save();
        }));
    }

    delete(ID: number) {

        return ModuleModel.model.findByPk(ID).then((ModuleInstance) => {
            return ModuleInstance.destroy();

        });
    }

}

export = ModuleService;