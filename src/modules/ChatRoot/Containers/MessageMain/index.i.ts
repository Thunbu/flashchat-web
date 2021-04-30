import {ChatItemInterface} from "../../Store/Types/chatList.t";

export interface MessageMainUseStoreStatesInterface {
    ActiveChat: string,
    GetChatItemByKey: (key: string) => ChatItemInterface
}
export interface MessageMainUseStoreActionsInterface {

}
export type MessageMainUseStoreInterface = MessageMainUseStoreStatesInterface & MessageMainUseStoreActionsInterface;

export interface MessageMainPropsInterface extends MessageMainUseStoreInterface {

}
export interface MessageMainStateInterface {

}
