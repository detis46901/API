import Sequelize = require('sequelize');
import NotificationModel = require('../models/notification-model');
//import ParentService = require('../../parent-service');

class NotificationService {

    getList(searchValue: string): Promise<NotificationModel.NotificationInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'name'
            ]
        };

        if (searchValue) {
            findOptions.where = {
                $or: [
                    { name: { $iLike: `%${searchValue}%` } }
                ]
            }
        }
        
        return NotificationModel.Model.findAll(findOptions);
    }

    getByUser(userID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'userID'
            ]
        };

        if (userID) {
            findOptions.where = {
                $and: [
                    {userID: userID}
                ]
            }
        }

        return NotificationModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<NotificationModel.NotificationInstance> {
        return NotificationModel.Model.findById(rowID);
    }

    create(request: App.Notification): Promise<NotificationModel.NotificationInstance> {
        return NotificationModel.Model.create(request);
    }

    update(request: App.Notification): Promise<NotificationModel.NotificationInstance> {
        
        return <any>(NotificationModel.Model.findById(request.ID).then((NotificationInstance) => {

            NotificationInstance.userID = request.userID
            NotificationInstance.name = request.name
            NotificationInstance.description = request.description
            NotificationInstance.link = request.link
            NotificationInstance.priority = request.priority
            NotificationInstance.read = request.read

            return NotificationInstance.save();
        }));
    }

    delete(ID: number) {

        return NotificationModel.Model.findById(ID).then((NotificationInstance) => {

            return NotificationInstance.destroy();

        });
    }

}

export = NotificationService;