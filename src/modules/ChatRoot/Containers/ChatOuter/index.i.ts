import {MenuDataItem} from "../../Store/Types/system.t";

export interface ChatOuterUseStoreStateMapTypes {
    Containers: MenuDataItem[]
}
export interface ChatOuterUseStoreActionsMapTypes {

}

export type ChatOuterUseStoreTypes = ChatOuterUseStoreActionsMapTypes & ChatOuterUseStoreStateMapTypes;
export interface ChatOuterPropsTypes extends ChatOuterUseStoreTypes {

}
export interface ChatOuterStateTypes {

}
