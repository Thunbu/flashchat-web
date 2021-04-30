import {MenuDataItem, TabContainers} from "../../Store/Types/system.t";

export interface LeftMenuInheritStoreStates {
   Containers: MenuDataItem[],
   ActiveContainer: TabContainers,
   CurrentUserAvatar: string
}
export interface LeftMenuUseStoreActions {
   UpdateActiveContainer: (containerId: TabContainers) => void;
}
export type LeftMenuInheritByReducer = LeftMenuInheritStoreStates & LeftMenuUseStoreActions;

export interface LeftMenuProps extends LeftMenuInheritByReducer {

}
