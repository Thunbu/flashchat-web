import {
    ExternalInteraction,
    MessageLocalInteraction,
    MessageOnlineInteraction,
    PublicMessageInteraction
} from "../types/_message";
import IMSendMessageTypes = ExternalInteraction.IMSendMessageTypes;
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageContentsInterface = PublicMessageInteraction.MessageContentsInterface;
import IMGetMessageListParams = ExternalInteraction.IMGetMessageListParams;
import IMGetMsgListAndCdMsgListResponse = MessageOnlineInteraction.IMGetMsgListAndCdMsgListResponse;
import IMGetMessageInterface = MessageOnlineInteraction.IMGetMessageInterface;


/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_SendMessage
 * @description SDK 发送消息
 * @param {IMSendMessageTypes} params - 参数
 * @return {Promise<any>}
 */
export const IM_SendMessage = <T = MessageContentsInterface>(params: IMSendMessageTypes<T>): Promise<any> => {
    return new Promise<MessageItemInterface>((resolve, reject) => {
        window.SIM.sendMsg(params, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_GetMessageList
 * @description SDK 获取线上消息列表
 * @param {IMGetMessageListParams} params - 参数
 * @return {Promise<IMGetMessageInterface[]>}
 */

export const IM_GetMessageList = (params: IMGetMessageListParams): Promise<IMGetMessageInterface[]> => {
    return new Promise((resolve, reject) => {
        window.SIM.getMsgListAndCdMsgById(params, (res: IMGetMsgListAndCdMsgListResponse) => {
            resolve(res.msg);
        }, reject);
    });
};
