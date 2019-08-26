import LayerPermissionService = require('../services/layers-permission-service');
import GroupMemberService = require('../../users/services/group-member-service');
import token_auth = require('../../JWT_Checker/loginToken.js');
import { GroupMemberInstance } from '../../users/models/group-member-model';
import { LayerPermissionInstance } from '../models/layers-permission-model';

export class LayerPermissions {
    constructor (public groupMemberService: GroupMemberService, public layerPermissionService: LayerPermissionService) {}
    public finalResponse = new Array<any>();
    public groups = new Array<number>();

    public getPermissions(userID): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.groupMemberService.getByUser(userID).then((result) => {
                for (let i=0; i<result.length; i++) {
                    let gg = new Array<number>()
                    this.groups.push(result[i].groupID)
                }
                this.layerPermissionService.getByUserAndGroup(userID, this.groups).then((final) => {
                    let lastLayerID: number
                    final.sort((leftside, rightside): number => {
                        if (leftside.layerID < rightside.layerID) return -1
                        if (leftside.layerID > rightside.layerID) return 1
                        return 0
                    })
                    let finalToSend: LayerPermissionInstance[] = []
                    for (let j=0; j<final.length; j++) {
                        //console.log(final[j].layerID)
                        if (final[j].layerID != lastLayerID) {
                            lastLayerID = final[j].layerID
                            finalToSend.push(final[j])
                        }
                        else {
                            if (final[j].canGrant == true) {
                                finalToSend[finalToSend.length-1].canGrant = true
                            }
                            if (final[j].delete == true) {
                                finalToSend[finalToSend.length-1].delete = true
                            }
                            if (final[j].edit == true) {
                                finalToSend[finalToSend.length-1].edit = true
                            }
                        }
                    }
                    resolve(finalToSend)                    
                })
            })
        })
        return promise
    }
    
}