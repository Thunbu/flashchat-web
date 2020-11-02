import {StoreDispatchHandle} from "../store.i";
import {ChatItemInterface, ChatListStoreTypes, SET_CHAT_LIST, UPDATE_ACTIVE_CHAT} from "../Types/chatList.t";
import {IMGetChatSessionItem} from "../../Methods/IM/im.i";
import {IMChatSessionInfoJoinToLocal, IMGetMessageJoinToLocal} from "../../Methods/IM/im.u";
import {ADD_MESSAGE_TO_CHAT, ADD_MESSAGE_TO_MAP} from "../Types/message.t";

export const ChangeActiveChat = (dispatch: StoreDispatchHandle, activeChat: ChatItemInterface): void => {
    dispatch({ type: UPDATE_ACTIVE_CHAT, data: activeChat.id });
}

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name SetChatListByResponse
 * @description 通过全量获取会话列表的返回内容来设置会话列表
 * @param {StoreDispatchHandle} dispatch - 操作store的方法
 * @param {IMGetChatSessionItem[]} ChatList - 会话列表
 * @return {void}
 */
export const SetChatListByResponse = (dispatch: StoreDispatchHandle, ChatList: IMGetChatSessionItem[]): void => {
    const listMap: ChatListStoreTypes['listMap'] = {};
    const listIds: string[] = [];
    ChatList.forEach((item) => {
        const ChatItem = IMChatSessionInfoJoinToLocal(item);
        const Message = IMGetMessageJoinToLocal(item.lastMsg);
        listMap[ChatItem.id] = ChatItem;
        listIds.push(ChatItem.id);
        dispatch({ type: ADD_MESSAGE_TO_MAP, data: Message });
        dispatch({ type: ADD_MESSAGE_TO_CHAT, data: {chatId: Message.chatId, messageId: Message.id}});
    });
    dispatch({
        type: SET_CHAT_LIST,
        data: {
            MAP: listMap,
            IDList: listIds
        }
    });
    return void(0);
}
