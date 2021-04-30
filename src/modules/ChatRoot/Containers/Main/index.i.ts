import {UpdateCurrentUserParams} from "../../Store/Types/system.t";
import {IMGetChatSessionItem} from "../../Methods/IM/types/_chat";

export interface MainUseStoreStateTypes {
    UserIMID: string,
    UserSig: string
}
export interface MainUseStoreActionTypes {
    UpdateCurrentUserInfo(params: UpdateCurrentUserParams): void,
    SetChatListByResponse(params: IMGetChatSessionItem[]): void
}
export type MainUseStoreTypes = MainUseStoreStateTypes & MainUseStoreActionTypes;

export interface MainState {
}
export interface MainProps extends MainUseStoreTypes {
}
