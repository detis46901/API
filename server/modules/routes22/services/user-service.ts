import Sequelize = require('sequelize');
import UserModel = require('../models/user-model');
import bcrypt = require('bcrypt');

class UserService {

    getList(searchValue: string): Promise<UserModel.UserInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'lastName'
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
        
        return UserModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserModel.UserInstance> {
        return UserModel.model.findByPk(rowID);
    }

    create(request: App.User): Promise<UserModel.UserInstance> {
        return UserModel.model.create(request);
    }

    update(request: App.User): Promise<UserModel.UserInstance> {
        return <any>(UserModel.model.findByPk(request.ID).then((UserInstance) => {

            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.email = request.email;
            UserInstance.active = request.active;
            UserInstance.administrator = request.administrator;
            if (request.password) {
                UserInstance.password = request.password;
            }

            return UserInstance.save();
        }));
    }

    delete(ID: number) {
        return UserModel.model.findByPk(ID).then((UserInstance) => {

            return UserInstance.destroy();

        });
    }

}

export = UserService;