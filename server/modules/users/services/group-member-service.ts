import Sequelize = require('sequelize');
import GroupMemberModel = require('../models/group-member-model');
import UserModel = require('../models/user-model');
import GroupModel = require('../models/group-model');

class GroupMemberService { 
    getList(searchValue: string): Promise<GroupMemberModel.GroupMemberInstance[]> {
        return GroupMemberModel.model.findAll();
    }

    getByUser(userID: number): Promise<GroupMemberModel.GroupMemberInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (userID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { userID: userID}
                ]
            }
        }

        findOptions.include = [GroupModel.model]
        return GroupMemberModel.model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<GroupMemberModel.GroupMemberInstance[]> {
        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (groupID) {
            findOptions.where = {
                [Sequelize.Op.and]: [
                    { groupID: groupID}
                ]
            }
        }

        findOptions.include = [UserModel.model]
        return GroupMemberModel.model.findAll(findOptions);
    }

    get(rowID: number): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.model.findByPk(rowID);
    }

    create(request: App.GroupMember): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.model.create(request);
    }

    delete(ID: number) {
        return GroupMemberModel.model.findByPk(ID).then((GroupMemberInstance) => {
            return GroupMemberInstance.destroy();
        });
    }
}

export = GroupMemberService