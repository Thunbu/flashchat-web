import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import MessageContentsInterface = PublicMessageInteraction.MessageContentsInterface;
import {CurrentUserInterface} from "../../Store/Types/system.t";

export interface MessageEditorUseStoreStatePropsInterface {
    SendMsg<T = MessageContentsInterface>(
        content: T,
        type: MessageTypeEnum,
        params: SendMsgExtParams
    ): void,
}
export interface MessageEditorUseStoreActionPropsInterface {
    ActiveChat: string,
    GetChatItemByKey: (key: string) => ChatItemInterface,
    CurrentUser: CurrentUserInterface
}
export interface MessageEditorPropsInterface {
    chat: ChatItemInterface,
    onSubmit(val: string, type: MessageTypeEnum): void
}
export type MessageEditorContainerProps = MessageEditorUseStoreStatePropsInterface
    & MessageEditorUseStoreActionPropsInterface
    & MessageEditorPropsInterface;
export interface MessageEditorStateInterface {

}
export interface SendMsgExtParams {
    receiver: string,
    chatType: 0|1,
    sender: string
}

