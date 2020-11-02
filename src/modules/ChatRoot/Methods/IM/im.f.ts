import {
    IMGetChatSessionInfoParams,
    IMGetChatSessionItem,
    IMGetChatSessionListParams,
    IMGetUsersDataParams,
    IMGetUsersDataItem, IMSendMessageTypes,
    MessageItemInterface,
} from "./im.i";

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_GetMultiPersonalData
 * @description SDK获取人员信息
 * @param {IMGetUsersDataParams} params - 参数
 * @return {Promise<IMGetUsersDataItem[]>}
 */
export const IM_GetMultiPersonalData = (params: IMGetUsersDataParams): Promise<IMGetUsersDataItem[]> => {
    return new Promise<IMGetUsersDataItem[]>((resolve, reject) => {
        window.SIM.getMultiPersonalData(params, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_GetChatSessionList
 * @description SDK 获取会话列表
 * @param {IMGetChatSessionListParams} params - 参数
 * @return {Promise<IM_GetChatSessionList[]>}
 */
export const IM_GetChatSessionList = (params: IMGetChatSessionListParams): Promise<IMGetChatSessionItem[]> => {
    return new Promise<IMGetChatSessionItem[]>((resolve, reject) => {
        window.SIM.getAllChat(params, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_GetChatSessionInfo
 * @description SDK获取会话详细信息
 * @param {IMGetChatSessionInfoParams} params - 参数
 * @return {Promise<IMGetChatSessionItem>}
 */
export const IM_GetChatSessionInfo = (params: IMGetChatSessionInfoParams): Promise<IMGetChatSessionItem> => {
    return new Promise<IMGetChatSessionItem>((resolve, reject) => {
        window.SIM.getChatInfo(params, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_SendMessage
 * @description SDK 发送消息
 * @param {IMSendMessageTypes} params - 参数
 * @return {Promise<any>}
 */
export const IM_SendMessage = (params: IMSendMessageTypes): Promise<any> => {
    return new Promise<MessageItemInterface>((resolve, reject) => {
        window.SIM.sendMsg(params, resolve, reject);
    });
}
