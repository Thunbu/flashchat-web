import * as React from "react";
import {connect} from "react-redux";
import SearchGlobal from "../SearchGlobal";
import ChatListItem from "../../../../components/ChatListItem";
import {
    ChatListComponentPropsInterface,
    ChatListComponentStatesInterface,
    ChatListUseStoreActionsTypes,
    ChatListUseStoreStatesTypes
} from "./index.i";
import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";
import {ChangeActiveChat} from "../../Store/Action/chatList.a";

class ChatList extends React.Component<ChatListComponentPropsInterface, ChatListComponentStatesInterface>{
    protected onChatClick = (event: React.MouseEvent, activeChat: ChatItemInterface) => {
        this.props.ChangeActiveChat(activeChat);
    };
    protected renderChatItem = (): React.ReactNodeArray => {
        const { GetChatLastMsg, activeChat, ChatList } = this.props;
        return ChatList.map((item): React.ReactNode => {
            const lastMsg = GetChatLastMsg(item);
            return <ChatListItem chat={this.getChatItemByKey(item)} onClick={this.onChatClick}
                                 activeId={activeChat} key={item} lastMsg={lastMsg} />;
        });
    };
    protected getChatItemByKey = (key: string): ChatItemInterface => {
        return this.props.GetChatItemByKey(key);
    }
    render() {
        return (
            <div id={'chat_list'}>
                <SearchGlobal class={'search_header'} />
                <div className={'list_container'}>
                    {this.renderChatItem()}
                </div>
            </div>
        );
    }
}


export const ChatListUseStoreStates = (state: StoreStatesTypes): ChatListUseStoreStatesTypes => ({
    ChatList: state.ChatList.list,
    activeChat: state.ChatList.active,
    GetChatItemByKey: (key) => state.ChatList.listMap[key],
    GetChatLastMsg: (chatId: string) => {
        const chatMsgList = state.Message.ChatMessageList[chatId];
        if (chatMsgList) {
            return state.Message.MessageMap[chatMsgList.slice(-1)[0]];
        }
    }
});
export const ChatListUseStoreActions = (dispatch: StoreDispatchHandle): ChatListUseStoreActionsTypes => ({
    ChangeActiveChat: (activeChat: ChatItemInterface) => ChangeActiveChat(dispatch, activeChat)
});

export default connect(ChatListUseStoreStates, ChatListUseStoreActions)(ChatList);
