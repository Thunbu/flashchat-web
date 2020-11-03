import {IMGetChatSessionInfoParams, IMGetChatSessionItem, IMGetChatSessionListParams} from "../types/_chat";

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
