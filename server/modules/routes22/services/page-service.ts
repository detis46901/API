import Sequelize = require('sequelize');
import PageModel = require('../models/page-model');


class PageService {

    getList(userID: number): Promise<PageModel.PageInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'pageOrder'
            ]
        };
        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }
        return PageModel.model.findAll(findOptions);
    }

    getActiveByUserID(userID: number): Promise<PageModel.PageInstance[]> {
                var findOptions: Sequelize.FindOptions = {
                    order: [
                        'pageOrder'
                    ]
                };
                if (userID) {
                    findOptions.where = {
                        [Sequelize.Op.and]: [
                            { userID: userID},
                            { active: true}
                        ]
                    }
                }
                return PageModel.model.findAll(findOptions);
            }
        
    getDefault(userID: number): Promise<PageModel.PageInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'userID'
            ]
        };
        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID},
                    { default: true}
                ]
            }
        }
        return PageModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<PageModel.PageInstance> {
        return PageModel.model.findByPk(rowID);
    }

    create(request: App.UserPage): Promise<PageModel.PageInstance> {
        return PageModel.model.create(request);
    }

    update(request: App.UserPage): Promise<PageModel.PageInstance> {
        return <any>(PageModel.model.findByPk(request.ID).then((PageInstance) => {
            PageInstance.userID = request.userID;
            PageInstance.page = request.page;
            PageInstance.pageOrder = request.pageOrder;
            PageInstance.default = request.default;
            PageInstance.active = request.active;
            return PageInstance.save();
        }));
    }

    delete(ID: number) {
        return PageModel.model.findByPk(ID).then((PageInstance) => {
            return PageInstance.destroy();
        });
    }
}

export = PageService;