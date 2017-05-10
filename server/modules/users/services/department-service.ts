import Sequelize = require('sequelize');
import DepartmentModel = require('../models/department-model');


class DepartmentService {

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
        
        return DepartmentModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<DepartmentModel.DepartmentInstance> {
        return DepartmentModel.Model.findById(rowID);
    }

    create(request: App.Department): Promise<DepartmentModel.DepartmentInstance> {
        console.log ('At Create Request')
        return DepartmentModel.Model.create(request);
    }

    update(request: App.Department): Promise<DepartmentModel.DepartmentInstance> {
        
        return <any>(DepartmentModel.Model.findById(request.ID).then((DepartmentInstance) => {

            DepartmentInstance.department = request.department;
            DepartmentInstance.active = request.active;

            return DepartmentInstance.save();
        }));
    }

    delete(rowID: number) {

        return DepartmentModel.Model.findById(rowID).then((DepartmentInstance) => {

            return DepartmentInstance.destroy();

        });
    }

}

export = DepartmentService;