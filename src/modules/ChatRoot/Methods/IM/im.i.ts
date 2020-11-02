/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef SIMLoginParams
 * @description IM登录参数
 * @property {string} appId
 * @property {string} terminal
 * @property {string} userId
 * @property {string} account
 * @property {string} userSig
 * @property {string} appversion
 * @property {boolean} isForce
 */
export interface SIMLoginParams {
    appId: string,
    terminal: string,
    userId: string,
    account: string,
    userSig: string,
    appversion: string,
    isForce: boolean
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetUsersDataParams
 * @description SDK 获取人员信息方法的参数类型
 * @property {string[]} userIds
 */
export interface IMGetUsersDataParams {
    userIds: string[]
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetUsersDataItem
 * @description SDK 获取到的人员信息的返回类型
 * @property {string} avatar - 头像
 * @property {string} createTime - 创建时间
 * @property {string} userNickname - 用户姓名
 * @property {string} nicknamePy - 姓名拼音
 * @property {number} userStatus - 人员状态
 * @property {string} userId - 用户IMID
 */
export interface IMGetUsersDataItem {
    avatar: string,
    createTime: string,
    userNickname: string,
    nicknamePy: string,
    userStatus: number,
    userId: string
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetChatSessionListParams
 * @description SDK 获取会话列表接口的参数
 * @property {?number<'0'|'1'>} sessionLevel - 会话类型
 * @property {?number} lastPullTime - 最后更新时间
 */
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
 * @typedef IMGetMessageInterface
 * @description 通过SDK获取到的消息 - 远程消息类型
 * @property {string} appId
 * @property {number<'0'|'1'>} chatType - 会话类型（0-单聊 1-群聊）
 * @property {number} command - 指令
 * @property {boolean} cross - 域信息 是否跨域
 * @property {string} domain
 * @property {number<'0'|'1'>} groupType - 是否是群组
 * @property {string} id - 消息ID
 * @property {boolean} isAdminDelete - 是否为管理员删除
 * @property {boolean} isRevocation - 是否撤回
 * @property {boolean} isSelfDelete - 是否为自己删除
 * @property {any} message - 消息内容
 * @property {boolean} offlinePush - 是否为离线推送消息
 * @property {string} offlinePushInfo - 离线推送消息内容
 * @property {string} pAll
 * @property {string} pReaded
 * @property {boolean} readed - 是否已读
 * @property {boolean} readedFlag - 已读状态
 * @property {string} receiver - 接收者
 * @property {string} replyCount - 回复数量
 * @property {string} securityType - 密聊类型
 * @property {string} sender - 发送者
 * @property {boolean} sign - 是否有效
 * @property {string<"0"|"1">} terminal - 端信息（0-web端， 1-app端）
 * @property {string} time - 时间
 * @property {MessageTypeEnum} type - 类型
 * @property {string} userId - 人员信息
 * @property {number} varStatus
 */
export interface IMGetMessageInterface {
    appId: string
    chatType: 0|1
    command: number
    cross: boolean
    domain: any
    groupType: 0|1
    id: string
    isAdminDelete: boolean
    isRevocation: boolean
    isSelfDelete: boolean
    message: any
    offlinePush: boolean
    offlinePushInfo: any
    pAll: number
    pReaded: number
    readed: boolean
    readedFlag: boolean
    receiver: string
    replyCount: number
    securityType: 0|1
    sender: string
    sign: boolean
    terminal: "0"|"1"
    time: number
    type: MessageTypeEnum
    userId: string
    varStatus: number
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
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef MessageTypeEnum
 * @description 消息类型
 * @property {number} 0 - 文本
 * @property {number} 1 - 图片
 * @property {number} 2 - 语音
 * @property {number} 3 - 视频
 * @property {number} 4 - 文件
 * @property {number} 6 - 撤回消息
 * @property {number} 8 - 合并转发
 * @property {number} 9 - 群音视频
 * @property {number} 10 - 个人音视频
 * @property {number} 11 - 自定义表情
 * @property {number} 10000 - 扩展类消息
 */
export type MessageTypeEnum = 0|1|2|3|4|5;
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef MessageItemInterface
 * @description 消息类型 - 本地已经转换过的消息类型
 * @property {string} id - 消息ID
 * @property {string} chatId - 会话ID
 * @property {string|number} time - 时间
 * @property {number<'0'|'1'>} chatType - 会话类型
 * @property {string} receiverId - 接收者ID
 * @property {number<'-1'|'0'|'1'>} state - 消息状态
 * @property {boolean} isDelete - 是否删除
 * @property {MessageTypeEnum} type - 消息类型
 * @property {any} message - 消息内容
 * @property {any} domain - 元信息
 * @property {string} sender - 发送者
 */
export type MessageItemInterface = {
    id: string,
    chatId: string,
    time: string|number,
    chatType: 0|1,
    receiverId: string,
    state: -1|0|1,
    isDelete: boolean,
    type: MessageTypeEnum,
    message: any,
    domain: any,
    sender: string,
};
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMSendMessageBaseTypes<T, D = any>
 * @description 通过SDK发送消息的接口参数
 * @property {number<'0'|'1'>} securityType - 密聊类型
 * @property {string} receiver - 接收者
 * @property {number<'0'|'1'>} chatType - 会话类型
 * @property {number<'0'|'1'>} cross - 是否跨域
 * @property {MessageTypeEnum} type - 消息类型
 * @property {string} id - 消息ID
 * @property {number} time - 消息发送时间
 * @property {T} message - 消息内容
 * @property {D=any} domain - 消息元信息
 */
export interface IMSendMessageBaseTypes<T, D = any> {
    securityType: 0|1,
    receiver: string,
    chatType: 0|1,
    cross: 0|1,
    type: MessageTypeEnum,
    id: string,
    time: number,
    message: T,
    domain: D
}
export type IMSendMessageTypes<T = any, D = any> = IMSendMessageBaseTypes<T, D>;
