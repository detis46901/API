import Sequelize = require('sequelize');
import UserModel = require('../models/users-model');


class UserService {

    getList(searchValue: string): Promise<UserModel.UserInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'lastName'
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
        
        return UserModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserModel.UserInstance> {
        return UserModel.Model.findById(rowID);
    }

    create(request: App.User): Promise<UserModel.UserInstance> {
        return UserModel.Model.create(request);
    }

    update(request: App.User): Promise<UserModel.UserInstance> {
        
        return <any>(UserModel.Model.findById(request.rowID).then((UserInstance) => {

            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.roleID = request.roleID;
            UserInstance.email = request.email;
            UserInstance.active = request.active;
            UserInstance.administrator = request.administrator;
            if (request.password) {
                UserInstance.password = request.password;
            }

            return UserInstance.save();
        }));
    }

    delete(rowID: number) {

        return UserModel.Model.findById(rowID).then((UserInstance) => {

            return UserInstance.destroy();

        });
    }

}

export = UserService;