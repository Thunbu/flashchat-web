import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;


export interface ChatListUseStoreStatesTypes {
    ChatList: string[],
    activeChat: string,
    GetChatItemByKey: (key: string) => ChatItemInterface,
    GetChatLastMsg(chatId: string): MessageItemInterface|undefined
}
export interface ChatListUseStoreActionsTypes {
    ChangeActiveChat: (activeChat: ChatItemInterface) => void,
}
export type ChatListUseStoreInterface = ChatListUseStoreStatesTypes & ChatListUseStoreActionsTypes;

export interface ChatListComponentPropsInterface extends ChatListUseStoreInterface {

}
export interface ChatListComponentStatesInterface {

}