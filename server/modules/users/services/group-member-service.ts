import GroupMemberModel = require('../models/group-member-model');

class GroupMemberService { 
    getList(searchValue: string): Promise<GroupMemberModel.GroupMemberInstance[]> {
        return GroupMemberModel.Model.findAll();
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