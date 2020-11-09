/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_SendMessage
 * @description SDK 发送消息
 * @param {IMSendMessageTypes} params - 参数
 * @return {Promise<any>}
 */
import {ExternalInteraction, MessageLocalInteraction, PublicMessageInteraction} from "../types/_message";
import IMSendMessageTypes = ExternalInteraction.IMSendMessageTypes;
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageContentsInterface = PublicMessageInteraction.MessageContentsInterface;

export const IM_SendMessage = <T = MessageContentsInterface>(params: IMSendMessageTypes<T>): Promise<any> => {
    return new Promise<MessageItemInterface>((resolve, reject) => {
        window.SIM.sendMsg(params, resolve, reject);
    });
}
