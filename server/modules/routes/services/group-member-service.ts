import Sequelize = require('sequelize');
import GroupMemberModel = require('../models/group-member-model');
import UserModel = require('../models/user-model');
import GroupModel = require('../models/group-model');

class GroupMemberService { 
    getList(searchValue: string): Promise<GroupMemberModel.GroupMemberInstance[]> {
        return GroupMemberModel.Model.findAll();
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

        findOptions.include = [GroupModel.Model]
        return GroupMemberModel.Model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<GroupMemberModel.GroupMemberInstance[]> {
        console.log(groupID)
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

        findOptions.include = [UserModel.Model]
        return GroupMemberModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.Model.findByPk(rowID);
    }

    create(request: App.GroupMember): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.Model.create(request);
    }

    delete(ID: number) {
        return GroupMemberModel.Model.findByPk(ID).then((GroupMemberInstance) => {
            return GroupMemberInstance.destroy();
        });
    }
}

export = GroupMemberService