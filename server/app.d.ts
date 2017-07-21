
declare module App {

    interface IModelBase {
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface IDogeFriend extends IModelBase {
        idDogeFriend?: number;
        firstName?: string;
        lastName?: string;
        favoriteDogePhrase?: string;
        reputation?: number;
    }

    interface User extends IModelBase {
        ID?: number;
        firstName?: string;
        lastName?: string;
        password?: string;
        roleID?: number;
        active?: boolean;
        email: string;
        administrator: boolean;
    }

    interface LayerAdmin extends IModelBase {
        ID?: number;
        layerName?: string;
        layerType?: string;
        serverID?: string;
        layerIdent?: string;
        layerFormat?: string;
        layerDescription?: string;
        layerGeom?: string;
    }

    interface LayerPermission extends IModelBase {
        ID?: number;
        userID?: number;
        edit?: boolean;
        layerAdminID?: number;
    }

    interface UserPageLayer extends IModelBase {
        ID?: number;
        userID?: number;
        layerON?: boolean;
        userpageID?: number;
        layerAdminID?: number;
    }

interface Department extends IModelBase {
        ID?: number;
        department?: string;
        active?: boolean;
    }

interface Group extends IModelBase {
        ID?: number;
        departmentID?: number;
        group: string;
        active?: boolean;
    }

interface Role extends IModelBase {
        ID?: number;
        groupID?: number;
        role: string;
        active?: boolean;
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
}

declare module 'app' {

    module e {
        
    }

    export = e;
}