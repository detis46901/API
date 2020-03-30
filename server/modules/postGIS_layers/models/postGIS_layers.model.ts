
export interface MyCubeComment {
    table: number;
    id: number;
    userid: number;
    comment: string;
    geom: string;
    featureid: number;
    auto: boolean;
    createdat: Date;
}

export interface MyCubeConstraint {
    name: string | number;
    option: string;
}

export interface MyCubeField {
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