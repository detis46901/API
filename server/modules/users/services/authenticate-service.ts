import Sequelize = require('sequelize');
import UserModel = require('../models/user-model');

class AuthService {

    getList(email: string, password: string): Promise<UserModel.UserInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (email != null && password != null) {
            findOptions.where = {
                $and: [
                    { password: `${password}` },
                    { email: `${email}` },
                ]
            }
        }
        return UserModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<UserModel.UserInstance> {
        return UserModel.Model.findById(rowID);
    }   

    getemail(email: string): Promise<UserModel.UserInstance> {
        return UserModel.Model.findById(email);
    }
    
    create(request: App.User): Promise<UserModel.UserInstance> {
        return UserModel.Model.create(request)
    }


    update(request: App.User): Promise<UserModel.UserInstance> {       
        return <any>(UserModel.Model.findById(request.ID).then((UserInstance) => {

            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;

            return UserInstance.save();
        }));
    }

    delete(rowID: number) {
        return UserModel.Model.findById(rowID).then((UserInstance) => {

            return UserInstance.destroy();

        });
    }

}

export = AuthService;