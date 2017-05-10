import Sequelize = require('sequelize');
import DepartmentModel = require('../models/organization-model');
import GroupModel = require('../models/organization-model');
import RoleModel = require('../models/organization-model');


class OrganizationService {

    getList(searchValue: string): Promise<DepartmentModel.DepartmentInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'department'
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
        
        return DepartmentModel.dModel.findAll(findOptions);
    }

    get(rowID: number): Promise<DepartmentModel.DepartmentInstance> {
        return DepartmentModel.dModel.findById(rowID);
    }

    create(request: App.Department): Promise<DepartmentModel.DepartmentInstance> {
        console.log ('At Create Request')
        return DepartmentModel.dModel.create(request);
    }

    update(request: App.Department): Promise<DepartmentModel.DepartmentInstance> {
        
        return <any>(DepartmentModel.dModel.findById(request.ID).then((DepartmentInstance) => {

            DepartmentInstance.department = request.department;
            DepartmentInstance.active = request.active;

            return DepartmentInstance.save();
        }));
    }

    delete(rowID: number) {

        return DepartmentModel.dModel.findById(rowID).then((DepartmentInstance) => {

            return DepartmentInstance.destroy();

        });
    }

}

export = DepartmentService;