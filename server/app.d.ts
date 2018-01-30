declare module App {
    interface IModelBase {
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface User extends IModelBase {
        ID?: number;
        firstName?: string;
        lastName?: string;
        password?: string;
        active?: boolean;
        email: string;
        administrator: boolean;
    }

    interface LayerAdmin extends IModelBase {
        ID?: number;
        layerName?: string;
        layerType?: string;
        layerService?: string;
        layerIdent?: string;
        layerFormat?: string;
        layerDescription?: string;
        layerGeom?: string;
        serverID?: string;
    }

    interface LayerPermission extends IModelBase {
        ID: number;
        edit: boolean;
        delete: boolean;
        owner: boolean;
        canGrant: boolean;
        grantedBy?: number;
        comments?: string;
        userID: number;
        layerAdminID: number;
        groupID: number;
    }

    interface UserPageLayer extends IModelBase {
        ID?: number;
        userID?: number;
        layerON?: boolean;
        userpageID?: number;
        layerAdminID?: number;
    }

    interface Group extends IModelBase {
        ID?: number;
        name: string;
        description?: string;
    }

    interface GroupMember extends IModelBase {
        ID: number;
        groupID: number;
        userID: number;
    }

    interface UserPage extends IModelBase {
        ID?: number;
        userID?: number;
        page: string;
        pageOrder: number;
        default: boolean;
        active?: boolean;
    }

    interface Server extends IModelBase {
        ID?: number;
        serverName?: string;
        serverType?: string;
        serverURL?: string;
    }

    interface Comments extends IModelBase {
        ID?: number;
        userID?: number;
        comment?: string;
        
    }
}

declare module 'app' {
    module e {}
    export = e;
}