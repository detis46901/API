import Sequelize = require('sequelize');
import UserModel = require('../models/users-model');

class UserService {

    getList(email: string, password: string): Promise<UserModel.UserInstance[]> { //hashing

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (email != null && password != null) {
            findOptions.where = {
                $and: [
                    { password: `${password}` } , //should be hashed here at this point
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
        /*let plain_password = request.password;

        bcrypt.genSalt(11, function (err, salt) {
            if (err) {
                return console.log(err);
            }

            bcrypt.hash(plain_password, salt, function (err, hashedPassword) {
                if (err) {
                    return console.log(err);
                }

                request.password = hashedPassword;
            })
        })*/ //hashing attempt
        return UserModel.Model.create(request)
    }


    update(request: App.User): Promise<UserModel.UserInstance> {
        
        return <any>(UserModel.Model.findById(request.ID).then((UserInstance) => {

            UserInstance.firstName = request.firstName;
            UserInstance.lastName = request.lastName;
            UserInstance.roleID = request.roleID;

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