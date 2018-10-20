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

    interface Layer extends IModelBase {
        ID?: number;
        layerName?: string;
        layerType?: string;
        layerService?: string;
        layerIdent?: string;
        layerFormat?: string;
        layerDescription?: string;
        layerGeom?: string;
        serverID?: string;
        defaultStyle?: JSON;
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
        layerID: number;
        groupID: number;
    }

    interface UserPageLayer extends IModelBase {
        ID?: number;
        userID?: number;
        layerON?: boolean;
        userpageID?: number;
        layerID?: number;
        style: JSON;
        layerOrder: number;
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

    interface Notification extends IModelBase {
        ID: number;
        userID: number;
        name: string;
        description: string;
        link: string;
        priority: number;
        read: boolean;
        objectType: string;
        sourceID: number;
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

    interface MyCubeComment extends IModelBase {
        table: number;
        id: number;
        userID: number;
        comment: string;
        geom: string;
        featureID: number;
        auto: boolean;
        createdat: Date;
    }
}

declare module 'app' {
    module e {}
    export = e;
}