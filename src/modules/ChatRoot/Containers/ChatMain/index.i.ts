import {TabContainers} from "../../Store/Types/system.t";

export interface ChatMainUseStoreStateTypes {
    ActiveContainer: TabContainers
}
export interface ChatMainUseStoreActionTypes {

}
export type ChatMainUseStoreTypes = ChatMainUseStoreActionTypes & ChatMainUseStoreStateTypes;

export interface ChatMainPropsTypes extends ChatMainUseStoreTypes{
    containerName: string
}
export interface ChatMainStateTypes {

}
