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
                $and: [
                    { userID: userID}
                ]
            }
        }

        findOptions.include = [UserModel.Model]
        return GroupMemberModel.Model.findAll(findOptions);
    }

    getByGroup(groupID: number): Promise<GroupMemberModel.GroupMemberInstance[]> {

        var findOptions: Sequelize.FindOptions = {
            order: [
                'ID'
            ]
        };

        if (groupID) {
            findOptions.where = {
                $and: [
                    { groupID: groupID}
                ]
            }
        }

        findOptions.include = [GroupModel.Model]
        return GroupMemberModel.Model.findAll(findOptions);
    }

    get(rowID: number): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.Model.findById(rowID);
    }

    create(request: App.GroupMember): Promise<GroupMemberModel.GroupMemberInstance> {
        return GroupMemberModel.Model.create(request);
    }

    delete(ID: number) {
        return GroupMemberModel.Model.findById(ID).then((GroupMemberInstance) => {
            return GroupMemberInstance.destroy();
        });
    }
}

export = GroupMemberService