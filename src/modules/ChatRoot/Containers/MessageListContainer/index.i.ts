import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {UserInterface} from "../../Store/Types/users.t";
import {CurrentUserInterface} from "../../Store/Types/system.t";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;

export interface MessageListUseStoreStatesInterface {
    GetChatMessagesByChatId: (id: string) => string[],
    GetMessageById: (id: string) => MessageItemInterface,
    CurrentUser: CurrentUserInterface,
    GetUserInfo(userId: string): UserInterface
}
export interface MessageListUseStoreActionsInterface {

}
export type MessageListUseStorePropsInterface = MessageListUseStoreStatesInterface & MessageListUseStoreActionsInterface;

export interface MessageListContainerPropsInterface extends MessageListUseStorePropsInterface {
    chat: ChatItemInterface
}
export interface MessageListContainerStateInterface {

}
