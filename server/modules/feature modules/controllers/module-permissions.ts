import ModulePermissionService = require('../services/module-permission-service');
import GroupMemberService = require('../../users/services/group-member-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import { GroupMemberInstance } from '../../users/models/group-member-model';

export class ModulePermissions {
    public finalResponse = new Array<any>();
    public groupMemberService = new GroupMemberService
    public modulePermissionService = new ModulePermissionService

    public getPermissions(userID): Promise<any> {
        let groups = new Array<number>();
        let promise = new Promise((resolve, reject) => {
            this.groupMemberService.getByUser(userID).then((result) => {
                for (let i=0; i<result.length; i++) {
                    groups.push(result[i].groupID)
                }
                this.modulePermissionService.getByUserAndGroup(userID, groups).then((final) => {
                    resolve(final)
                })
            })
        })
        return promise
    }
}