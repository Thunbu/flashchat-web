import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;

export interface MessageEditorContainerPropsInterface {
    chat: ChatItemInterface,
    onSubmit(val: string, type: MessageTypeEnum): void
}
export interface MessageEditorContainerStateInterface {

}

