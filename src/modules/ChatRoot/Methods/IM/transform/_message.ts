import {StoreStatesTypes} from "../../../Store/store.i";
import {SendMsgMetaType} from "../../../Store/Action/message.a";
import {ExternalInteraction, MessageLocalInteraction, MessageOnlineInteraction} from "../types/_message";
import IMGetMessageInterface = MessageOnlineInteraction.IMGetMessageInterface;
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import IMSendMessageTypes = ExternalInteraction.IMSendMessageTypes;

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name IMGetMessageJoinToLocal
 * @description 将SDK获取到的消息整合为本地可以展示的消息
 * @param {IMGetMessageInterface} params - 远程消息
 * @return {MessageItemInterface}
 */
export const IMGetMessageJoinToLocal = (params: IMGetMessageInterface): MessageItemInterface => {
    let chatId = params.receiver;
    const StoreState = <StoreStatesTypes>window.$store.getState();
    if (params.chatType === 0 && chatId === StoreState.System.CurrentUser.IMID) {
        chatId = params.sender;
    }
    return {
        id: params.id,
        chatId: chatId,
        time: params.time,
        chatType: params.chatType,
        receiverId: params.receiver,
        sender: params.sender,
        state: 1,
        isDelete: false,
        type: params.type,
        message: params.message,
        domain: params.domain
    }
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name SendMsgMetaDataJoinToRealData
 * @description 将需要发送的消息整合为SDK需要的数据
 * @param {SendMsgMetaType} params - 参数
 * @return {IMSendMessageTypes}
 */
export const SendMsgMetaDataJoinToRealData = (params: SendMsgMetaType): IMSendMessageTypes => {
    return {
        securityType: 0,
        receiver: params.receiver,
        chatType: params.chatType,
        cross: 0,
        type: params.type,
        id: window.SIM.utils.getGuid(4),
        time: new Date().getTime(),
        message: {
            text: params.content,
        },
        domain: {},
    };
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name SendMsgDataJoinToRealData
 * @description 将发送消息出去的消息数据整合成本地展示需要的数据
 * @param {IMSendMessageTypes} Data - 数据
 * @param {SendMsgMetaType} params - 元数据
 * @param {string} sender - 发送者
 * @param {MessageItemInterface["state"]} status - 状态
 * @return {MessageItemInterface}
 */
export const SendMsgDataJoinToRealData = (
    Data: IMSendMessageTypes,
    params: SendMsgMetaType,
    sender: string,
    status: MessageItemInterface["state"]
): MessageItemInterface => {
    return {
        id: Data.id,
        chatId: Data.receiver,
        time: Data.time,
        chatType: Data.chatType,
        receiverId: Data.receiver,
        sender: sender,
        state: status,
        isDelete: false,
        type: Data.type,
        message: Data.message,
        domain: Data.domain
    }
}
