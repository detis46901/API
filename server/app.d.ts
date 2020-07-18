declare module App {
    interface IModelBase {
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface Domain {
        ID: number;
        title: string;
        url: string;
        centerlong: number;
        centerlat: number;
        centerzoom: number;
        bingmapskey: string;
        mapboxbasemapurl: string;
        localz: string;
        cacheSize: number;
    }

    interface User extends IModelBase {
        ID?: number;
        firstName?: string;
        lastName?: string;
        password?: string;
        active?: boolean;
        email: string;
        administrator: boolean;
        public: boolean;
        apikey: string;
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
        defaultON?: boolean;
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
        schema: string;
        // table: number;
        logTable: string
        id: number;
        userid: number;
        comment: string;
        geom: string;
        featureid: number;
        auto: boolean;
        filename: string;
        file: any;
        createdat: Date;
    }

    interface Module extends IModelBase {
        ID?: number;
        identity: string;
        name: string;
        description: string;
        defaultInstanceSettings: JSON;
        defaultUserSettings: JSON;
    }
    interface ModuleInstances extends IModelBase {
        ID?: number;
        name: string;
        description: string;
        settings: JSON;
        moduleID: number
    }
    interface ModulePermission extends IModelBase {
        ID: number;
        edit: boolean;
        delete: boolean;
        owner: boolean;
        canGrant: boolean;
        grantedBy?: number;
        comments?: string;
        settings: JSON;
        userID: number;
        moduleInstanceID: number;
        groupID: number;
    }
    interface UserPageInstance extends IModelBase {
        ID?: number;
        userID?: number;
        defaultON?: boolean;
        userpageID?: number;
        moduleInstanceID?: number;
        instanceOrder: number;
    }
    interface mapConfig {
        name?: string;
        user: User;
        userID?: number;
        userpages?: UserPage[];
        defaultpage?: UserPage;  //This looks like a duplicate that is also in userpages[]
        currentpage?: UserPage;
        userpagelayers?: UserPageLayer[];
        userpageinstances?: UserPageInstance[];
        userpageinstancelist?: string;
        currentLayer?: UserPageLayer;
        currentLayerName?: string;
        editmode?: boolean;
        layerpermission?: LayerPermission[];
        modulepermission?: ModulePermission[];
    }
    interface MyCubeConstraint {
        name: string | number;
        option: string;
    }
    interface MyCubeField {
        field: string;
        type: string;
        description?: string;
        value?: any;
        options?: string[]
        label?: boolean;
        changed?: boolean;
        links?: any[]
        constraints?: Array<MyCubeConstraint>
    }
}

declare module 'app' {
    module e { }
    export = e;
}