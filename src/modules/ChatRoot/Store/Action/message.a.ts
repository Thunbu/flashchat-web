import {StoreDispatchHandle} from "../store.i";
import {ADD_MESSAGE_TO_CHAT, ADD_MESSAGE_TO_MAP, UPDATE_MESSAGE_STATE} from "../Types/message.t";
import {SendMsgDataJoinToRealData, SendMsgMetaDataJoinToRealData} from "../../Methods/IM/transform/_message";
import {IM_SendMessage} from "../../Methods/IM/function/_message";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import MessageContentsInterface = PublicMessageInteraction.MessageContentsInterface;

export interface SendMsgMetaType<T = MessageContentsInterface> {
    type: MessageTypeEnum,
    content: T,
    receiver: string,
    chatType: 0|1,
    sender: string,
}
export const SendMessage = <T = MessageContentsInterface>(
    dispatch: StoreDispatchHandle, params: SendMsgMetaType<T>
): void => {
    const data = SendMsgMetaDataJoinToRealData(params);
    const MetaData = SendMsgDataJoinToRealData(data, params.sender, 0);
    dispatch({ type: ADD_MESSAGE_TO_MAP, data: MetaData });
    dispatch({
        type: ADD_MESSAGE_TO_CHAT,
        data: {
            chatId: MetaData.chatId,
            messageId: MetaData.id
        }
    });
    IM_SendMessage(data).then(() => {
        dispatch({type: UPDATE_MESSAGE_STATE, data: { id: MetaData.id, state: 1 }});
    }).catch(() => {
        dispatch({type: UPDATE_MESSAGE_STATE, data: { id: MetaData.id, state: 0 }});
    });
}
