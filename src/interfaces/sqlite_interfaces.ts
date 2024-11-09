export interface AttributeHandler_Attribute {
    name: string;
    value: number;
    userID: string;
}

export interface TimezoneHandler_Place {
    placeMessage: string;
    url: string;
}

export interface UserHandler_User {
    userID: string;
    name: string;
    discriminator: string;
    displayName: string;
}

export interface PinHandler_Pin {
    channelID: string;
}

export interface RoleHandler_Role {
    userID: string;
    role: string;
}