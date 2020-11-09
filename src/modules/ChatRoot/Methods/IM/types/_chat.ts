/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetChatSessionListParams
 * @description SDK 获取会话列表接口的参数
 * @property {?number<'0'|'1'>} sessionLevel - 会话类型
 * @property {?number} lastPullTime - 最后更新时间
 */
import {MessageOnlineInteraction} from "./_message";
import IMGetMessageInterface = MessageOnlineInteraction.IMGetMessageInterface;

export interface IMGetChatSessionListParams {
    sessionLevel?: 0|1,
    lastPullTime?: number
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetChatSessionInfoParams
 * @description SDK 获取会话详细信息的参数类型
 * @property {string} chatId - 会话ID
 * @property {number<'0'|'1'>} securityType - 密聊类型
 * @property {number<'0'|'1'>} chatType - 会话类型
 */
export interface IMGetChatSessionInfoParams {
    chatId: string,
    securityType: 0|1,
    chatType: 0|1,
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetChatSessionItem
 * @description 通过SDK获取到会话信息 - 远程数据
 * @property {string} account - 账号信息
 * @property {string} appId
 * @property {string} avatar - 头像
 * @property {string} createTime - 创建时间
 * @property {number<'0'|'1'>} cross - 是否跨域
 * @property {string} id - 会话ID
 * @property {number<'0'|'1'>} invalid - 是否验证
 * @property {number<'0'|'1'>} isShow - 是否显示
 * @property {number<'0'|'1'>} isTop - 是否置顶
 * @property {IMGetMessageInterface} lastMsg - 最后一条消息
 * @property {number} messageCount - 未读消息数量
 * @property {number<'0'|'1'>} notDisturb - 是否免打扰
 * @property {number<'0'|'1'>} securityType - 密聊类型
 * @property {string} sessionId - 会话Id
 * @property {number<'0'|'1'>} sessionLevel - 会话类型
 * @property {string} sessionName - 会话名称
 * @property {number<'0'|'1'>} sessionType - 会话类型
 * @property {string} toppingTimeLong - 置顶时间
 * @property {string} unreadFirstPacketId
 * @property {string} updateTime - 更新时间
 */
export interface IMGetChatSessionItem {
    account: string
    appId: string
    avatar: string
    createTime: string
    cross: 0|1
    id: string
    invalid: 0|1
    isShow: 0|1
    isTop: 0|1
    lastMsg: IMGetMessageInterface,
    messageCount: number
    notDisturb: 0|1
    securityType: 0|1
    sessionId: string
    sessionLevel: 0|1
    sessionName: string
    sessionType: 0|1
    toppingTimeLong: string
    unreadFirstPacketId: string
    updateTime: string
}
