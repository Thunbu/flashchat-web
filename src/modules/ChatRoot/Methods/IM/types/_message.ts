
// 关于消息公共类型的定义，作用于 本地、远程、本地sdk
export namespace PublicMessageInteraction {
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
    export interface TextMessageContents {
        text: string,
        isAt?: boolean,
        members?: string[]
    }
    export type ImageMessageContentsItem = {
        type: 0|1|2, // 0 原图  1 大图   2 缩略图
        url: string,
        size: number,
        height: number,
        width: number,
    }
    export interface ImageMessageContents {
        format: 0|1, // 0 png  1 jpg
        imageList: ImageMessageContentsItem[],
        isHD: boolean, // 是否高清
    }
    export interface AudioMessageContents {
        format: number, // 类型
        second: number, // 时长，单位：秒
        size: number, // 大小，单位：字节
        downUrl: string, // 下载地址
        audio2Text: string, //  语音转文本
        ext: string // 扩展，比如描述等
    }
    export interface VideoMessageContents {
        coverUrl: string, // 视频封面地址
        coverHeight: number, // 封面高
        coverWidth: number, // 封面宽
        coverSize: number, // 封面大小
        coverFormat: 0|1|225, // 封面类型，0-JPG，1-PNG，225-未知类型
        videoUrl: string, // 视频地址
        videoSize: number, // 视频大小
        duration: number, // 视频时长
        videoFormat: 0|1|2|3|4|5|225, // 视频类型，0-AVI，1-RM，2-RMVB，3-WMV，4-MP4，5-MOV，225-未知类型
        ext?: string, // 扩展，比如描述等
    }
    export interface FileMessageContents {
        size: number, // 大小，单位：字节
        filename: string, // 文件名
        downUrl: string, // 下载地址
        ext: string, // 扩展，比如描述等
    }
    export type MessageContentsInterface =
        TextMessageContents
        |ImageMessageContents
        |AudioMessageContents
        |VideoMessageContents
        |FileMessageContents;
    export interface MessageForContentChart {
        0: TextMessageContents,
        1: ImageMessageContents,
        2: AudioMessageContents,
        3: VideoMessageContents,
        4: FileMessageContents
    }
}

// 关于消息本地处理的类型定义，只作用于本地
export namespace MessageLocalInteraction {
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
    export type MessageItemInterface<T = PublicMessageInteraction.MessageContentsInterface> = {
        id: string,
        chatId: string,
        time: string|number,
        chatType: 0|1,
        receiverId: string,
        state: -1|0|1,
        isDelete: boolean,
        type: PublicMessageInteraction.MessageTypeEnum,
        message: T,
        domain: any,
        sender: string,
    };
}

// 关于消息远程数据类型的定义，只作用于远程数据的类型定义
export namespace MessageOnlineInteraction {
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
        message: PublicMessageInteraction.MessageContentsInterface
        offlinePush: boolean
        offlinePushInfo: PublicMessageInteraction.MessageContentsInterface
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
        type: PublicMessageInteraction.MessageTypeEnum
        userId: string
        varStatus: number
    }
    /**
     * @author PengPeng
     * @date 11/2/20
     * @typedef IMGetMsgListAndCdMsgListResponse
     * @description 通过sdk获取到的消息与指令列表
     * @property {any[]} cdMsg - 指令列表
     * @property {IMGetMessageInterface[]} msg - 消息列表
     */
    export interface IMGetMsgListAndCdMsgListResponse {
        cdMsg: any[],
        msg: IMGetMessageInterface[]
    }
}

// 关于消息本地与远程的交互的参数定义声明
export namespace ExternalInteraction {
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
        type: PublicMessageInteraction.MessageTypeEnum,
        id: string,
        time: number,
        message: T,
        domain: D
    }
    export type IMSendMessageTypes<
        T = PublicMessageInteraction.MessageContentsInterface,
        D = any> = IMSendMessageBaseTypes<T, D>;

    /**
     * @author PengPeng
     * @date 11/2/20
     * @typedef IMGetMessageListParams
     * @description 通过SDK获取线上消息列表
     * @property {string} chatId - 会话ID
     * @property {number<'0'|'1'>} securityType - 密聊类型
     * @property {number<'0'|'1'>} chatType - 会话类型
     * @property {?string} msgId - 消息ID，以此消息ID作为基准拉取前后的消息
     * @property {number} rows - 拉取的条数
     * @property {number<'0'|'1'|'2'>} direct - 拉取的方向，0向下拉，1向上拉，2前后都有
     */
    export interface IMGetMessageListParams {
        chatId: string,
        chatType: 0|1,
        securityType: 0|1,
        msgId?: string,
        rows?: number,
        direct?: 0|1|2
    }
}

