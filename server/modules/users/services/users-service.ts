import Sequelize = require('sequelize');
import UserModel = require('../models/users-model');
import bcrypt = require('bcrypt');
//import Md5 = require('ts-md5/dist/md5');
import { Md5 } from 'ts-md5/dist/md5';

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

    getByRole(roleID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'roleID'
            ]
        };

        if (roleID) {
            findOptions.where = {
                $and: [
                    {roleID: roleID}
                ]
            }
        }

        return UserModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserModel.UserInstance> {
        return UserModel.Model.findById(rowID);
    }

    create(request: App.User): Promise<UserModel.UserInstance> {
        //let plain_password = request.password
        //put the hash in here, then set request.password to hash result, have the code written in the js of this file
        //request.password = (Md5.hashStr("Monday01")).toString()
        return UserModel.Model.create(request);
    }

    update(request: App.User): Promise<UserModel.UserInstance> {
        
        return <any>(UserModel.Model.findById(request.ID).then((UserInstance) => {

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

    delete(ID: number) {

        return UserModel.Model.findById(ID).then((UserInstance) => {

            return UserInstance.destroy();

        });
    }

}

export = UserService;