import {ExternalInteraction, MessageLocalInteraction} from "./types/_message";
import IMGetMessageListParams = ExternalInteraction.IMGetMessageListParams;
import {IMGetMessageJoinToLocal} from "./transform/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import {ADD_MESSAGE_LIST_TO_MAP, ADD_MESSAGE_LIST_TO_CHAT__LEFT_JOIN} from "../../Store/Types/message.t";
import {IM_GetMessageList} from "./function/_message";

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name SIM_FetchMessageList
 * @description SDK 获取线上消息列表
 * @param {IMGetMessageListParams} params - 参数
 * @return {Promise<MessageItemInterface[]>}
 */
export const SIM_FetchMessageList = (params: IMGetMessageListParams): Promise<MessageItemInterface[]> => {
    return IM_GetMessageList(params).then((res) => {
        const store = window.$store;
        const localMsgList: MessageItemInterface[] = [];
        const localMsgIdList: string[] = [];
        res.forEach((res) => {
            const localMsg = IMGetMessageJoinToLocal(res);
            if (params.msgId === localMsg.id) {
                return localMsg;
            }
            localMsgList.push(localMsg);
            localMsgIdList.push(localMsg.id);
        });
        store.dispatch({ type: ADD_MESSAGE_LIST_TO_MAP, data: localMsgList });
        store.dispatch({ type: ADD_MESSAGE_LIST_TO_CHAT__LEFT_JOIN, data: { chatId: params.chatId, messageIdList: localMsgIdList }});
        return localMsgList;
    });
}
