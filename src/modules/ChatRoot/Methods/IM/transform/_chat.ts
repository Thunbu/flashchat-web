import {IMGetChatSessionItem} from "../types/_chat";
import {ChatItemInterface} from "../../../Store/Types/chatList.t";
import {formatChatViewTime} from "../../index";

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name IMChatSessionInfoJoinToLocal
 * @description 将从IM获取到的chat信息转换成本地需要的数据
 * @param {IMGetChatSessionItem} ChatList - 会话列表
 * @return {ChatItemInterface}
 */
export const IMChatSessionInfoJoinToLocal = (ChatList: IMGetChatSessionItem): ChatItemInterface => {
    return {
        avatar: ChatList.avatar,
        name: ChatList.sessionName,
        time: formatChatViewTime(ChatList.updateTime),
        id: ChatList.sessionId,
        type: ChatList.sessionType
    }
}
