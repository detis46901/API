import Sequelize = require('sequelize');
import UserModel = require('../models/user-model');
import DomainModel = require('../../domain/models/domain-model')
import bcrypt = require('bcrypt');
//import ParentService = require('../../parent-service');

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
        
        return UserModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserModel.UserInstance> {
        var findOptions: Sequelize.FindOptions = { };
        findOptions.include = [DomainModel.Model]
        return UserModel.Model.findByPk(rowID, findOptions);
    }

    create(request: App.User): Promise<UserModel.UserInstance> {
        return UserModel.Model.create(request);
    }

    update(request: App.User): Promise<UserModel.UserInstance> {
        return <any>(UserModel.Model.findByPk(request.ID).then((UserInstance) => {

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
        return UserModel.Model.findByPk(ID).then((UserInstance) => {

            return UserInstance.destroy();

        });
    }

}

export = UserService;