import {UPDATE_USER_MESSAGE, UserInterface} from "../../Store/Types/users.t";
import {DefaultUser} from "../../Store/Data/users.data";
import {ADD_MESSAGE_TO_CHAT, ADD_MESSAGE_TO_MAP} from "../../Store/Types/message.t";
import {UPDATE_CHAT_ITEM} from "../../Store/Types/chatList.t";
import {SIMLoginParams} from "./types/_login";
import {IMGetChatSessionInfoParams} from "./types/_chat";
import {
    __DefaultSDKHTTPLocation,
    __DefaultWSLocation,
    __IMLoginAppId,
    __IMLoginAppVersion,
    __IMLoginTerminal
} from "../../config";
import {IMUserMessageJoinToLocal} from "./transform/_user";
import {IMChatSessionInfoJoinToLocal} from "./transform/_chat";
import {IMGetMessageJoinToLocal} from "./transform/_message";
import {IM_GetMultiPersonalData} from "./function/_user";
import {IM_GetChatSessionInfo} from "./function/_chat";
import {MessageOnlineInteraction} from "./types/_message";
import IMGetMessageInterface = MessageOnlineInteraction.IMGetMessageInterface;

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name InitSIM
 * @description 初始化SIM
 * @return {Promise<T>}
 */
export const InitSIM = <T = any>(): Promise<T> => {
    return new Promise((resolve, reject) => {
        window.SIM.init({
            serverip: __DefaultWSLocation,
            apiBaseUrl: __DefaultSDKHTTPLocation,
            debug: false
        }, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name LoginSIM
 * @description 登录SIM
 * @param {string} userId - 用户IMId
 * @param {string} userSig - 用户sig
 * @return {Promise<T>}
 */
export const LoginSIM = <T = any>(userId: string, userSig: string): Promise<T> => {
    const LoginObject: SIMLoginParams = {
        appId: __IMLoginAppId,
        terminal: __IMLoginTerminal,
        userId: userId,
        account: userId,
        userSig: userSig,
        appversion: __IMLoginAppVersion,
        isForce: true
    }
    return new Promise((resolve, reject) => {
        window.SIM.login(LoginObject, resolve, reject);
    });
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name FetchUserMessage
 * @description 通过远程数据获取用户信息，并同步本地store
 * @param {string[]} userIds - 用户ID数组
 * @return {Promise<UserInterface[]>}
 */
export const FetchUserMessage = (userIds: string[]): Promise<UserInterface[]> => {
    const store = window.$store;
    return new Promise((resolve, reject) => {
        IM_GetMultiPersonalData({
            userIds: userIds
        }).then((res) => {
            resolve(res.map((item) => {
                const userMsg = IMUserMessageJoinToLocal(item);
                store.dispatch({ type: UPDATE_USER_MESSAGE, data: {msg: userMsg, id: userMsg}});
                return userMsg;
            }));
        }).catch(reject);
    })
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name GetUserInfo
 * @description 获取用户的详细信息，并更新本地store中的用户信息
 * @param {string} userId - 用户ID
 * @return {UserInterface}
 */
export const GetUserInfo = (userId: string): UserInterface => {
    const store = window.$store;
    const userMap = store.getState().Users.UserMap;
    const userMsg = userMap[userId];
    if (userMsg) {
        return userMsg;
    } else {
        FetchUserMessage([userId]).then(void(0));
        return DefaultUser;
    }
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name CheckChatStatus
 * @description 检查会话状态，当会话不存在的话会获取会话信息，并添加到store中
 * @param {string} chatId - 会话ID
 * @param {IMGetChatSessionInfoParams['chatType']} chatType - 会话类型
 * @return {void}
 */
export const CheckChatStatus = (chatId: string, chatType: IMGetChatSessionInfoParams['chatType']) => {
    const store = window.$store;
    const { list, listMap } = store.getState().ChatList;
    if (!(listMap[chatId] && list.indexOf(chatId) > -1)) {
        IM_GetChatSessionInfo({
            chatId: chatId,
            chatType: chatType,
            securityType: 0
        }).then((res) => {
            const chatMsg = IMChatSessionInfoJoinToLocal(res);
            store.dispatch({ type: UPDATE_CHAT_ITEM, data: chatMsg });
        });
    }
}

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name OnGetNewMessage
 * @description 当获取到消息时处理的操作
 * @param {IMGetMessageInterface} msg - 消息
 * @return {void}
 */
export const OnGetNewMessage = (msg: IMGetMessageInterface): void => {
    const store = window.$store;
    console.log(msg);
    const Msg = IMGetMessageJoinToLocal(msg);
    GetUserInfo(Msg.sender);
    CheckChatStatus(Msg.chatId, Msg.chatType);
    store.dispatch({ type: ADD_MESSAGE_TO_MAP, data: Msg });
    store.dispatch({ type: ADD_MESSAGE_TO_CHAT, data: {chatId: Msg.chatId, messageId: Msg.id}});
    return void(0);
};

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name ListenSIMEvents
 * @description 监听SIM的消息事件
 */
export const ListenSIMEvents = () => {
    window.SIM.addEventListener('msg', (msg: IMGetMessageInterface) => {
        OnGetNewMessage(msg);
    });
    window.SIM.addEventListener('notice', (res: any) => {
        console.log('notice: ', res);
    });
    window.SIM.addEventListener('msgChange', (res: any) => {
        console.log('msgChange: ', res);
    });
    window.SIM.addEventListener('connectChange', (status: any) => {
        console.log('connectChange: ', status);
    });
}
