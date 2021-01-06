import * as React from "react";
import MessageAll from "../MessageAll";
import {connect} from "react-redux";
import {
    MessageListContainerPropsInterface, MessageListContainerStateInterface,
    MessageListContainerUseStoreActions,
    MessageListContainerUseStoreStates
} from "./index.s";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;


class MessageListContainer extends React.Component<MessageListContainerPropsInterface, MessageListContainerStateInterface>{
    protected getMessageList = (): MessageItemInterface[] => {
        const ChatId = this.props.chat.id;
        const messageIds = this.props.GetChatMessagesByChatId(ChatId) || [];
        return messageIds.map((messageId) => this.props.GetMessageById(messageId));
    };
    render() {
        return (
            <div id={'message_list_container'}>
                <MessageAll list={this.getMessageList()} chat={this.props.chat} />
            </div>
        )
    }
}
export default connect(MessageListContainerUseStoreStates, MessageListContainerUseStoreActions)(MessageListContainer);
