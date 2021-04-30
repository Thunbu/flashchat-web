import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {SendMsgMetaType} from "../../Store/Action/message.a";
import {CurrentUserInterface} from "../../Store/Types/system.t";


export interface MessageContainerUseStoreStateProps {
    CurrentUser: CurrentUserInterface
}
export interface MessageContainerUseStoreActionProps {
    SendMessage<T>(params: SendMsgMetaType): void
}
export type MessageContainerUseStoreProps = MessageContainerUseStoreActionProps & MessageContainerUseStoreStateProps;

export interface MessageContainerPropsInterface extends MessageContainerUseStoreProps{
    ChatItem: ChatItemInterface
}
