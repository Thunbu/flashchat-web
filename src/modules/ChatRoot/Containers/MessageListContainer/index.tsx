import * as React from "react";
import MessageAll from "../MessageAll";
import {connect} from "react-redux";
import {
    MessageListContainerPropsInterface, MessageListContainerStateInterface,
    MessageListUseStoreActionsInterface, MessageListUseStoreStatesInterface
} from "./index.i";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";


class MessageListContainer extends React.Component<MessageListContainerPropsInterface, MessageListContainerStateInterface>{
    protected getMessageList = (): MessageItemInterface[] => {
        const ChatId = this.props.chat.id;
        const messageIds = this.props.GetChatMessagesByChatId(ChatId) || [];
        return messageIds.map((messageId) => this.props.GetMessageById(messageId));
    };
    render() {
        return (
            <div id={'message_list_container'}>
                <MessageAll list={this.getMessageList()} chatId={this.props.chat.id} />
            </div>
        )
    }
}


export const MessageListContainerUseStoreStates = (state: StoreStatesTypes): MessageListUseStoreStatesInterface => ({
    GetMessageById: (id: string) => state.Message.MessageMap[id],
    GetChatMessagesByChatId: (id: string) => state.Message.ChatMessageList[id],
    CurrentUser: state.System.CurrentUser,
    GetUserInfo: (userId: string) => state.ChatList.listMap[userId]
});
export const MessageListContainerUseStoreActions = (dispatch: StoreDispatchHandle): MessageListUseStoreActionsInterface => ({

})

export default connect(MessageListContainerUseStoreStates, MessageListContainerUseStoreActions)(MessageListContainer);
