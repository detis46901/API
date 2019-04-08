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
                [Sequelize.Op.or]: [
                    { name: { [Sequelize.Op.iLike]: `%${searchValue}%` } }
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
                [Sequelize.Op.and]: [
                    {userID: userID}
                ]
            }
        }

        return NotificationModel.Model.findAll(findOptions);
    }

    getByType(objectType: string): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'objectType'
            ]
        };

        if (objectType) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    {objectType: objectType}
                ]
            }
        }

        return NotificationModel.Model.findAll(findOptions);
    }

    getBySource(sourceID: number): any {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'sourceID'
            ]
        };

        if (sourceID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    {sourceID: sourceID}
                ]
            }
        }

        return NotificationModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<NotificationModel.NotificationInstance> {
        return NotificationModel.Model.findByPk(rowID);
    }

    create(request: App.Notification): Promise<NotificationModel.NotificationInstance> {
        return NotificationModel.Model.create(request);
    }

    update(request: App.Notification): Promise<NotificationModel.NotificationInstance> {
        
        return <any>(NotificationModel.Model.findByPk(request.ID).then((NotificationInstance) => {

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

        return NotificationModel.Model.findByPk(ID).then((NotificationInstance) => {

            return NotificationInstance.destroy();

        });
    }

}

export = NotificationService;