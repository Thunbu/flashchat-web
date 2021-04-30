import {UserInterface} from "../../Store/Types/users.t";
import {CurrentUserInterface} from "../../Store/Types/system.t";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;

export interface MessageAllUseStoreStateInterface {
    CurrentUser: CurrentUserInterface,
    GetUserInfo(userId: string): UserInterface
}
export interface MessageAllUseStoreActionInterface {

}
export type MessageAllUseStoreInterface = MessageAllUseStoreActionInterface & MessageAllUseStoreStateInterface;

export interface MessageAllPropsInterface extends MessageAllUseStoreInterface {
    list: MessageItemInterface[],
    chatId: string
}
export interface MessageAllStateInterface {

}
