import * as React from "react";
import ChatHeader from "../../../../components/ChatHeader";
import {
    MessageContainerPropsInterface, MessageContainerUseStoreActionProps,
    MessageContainerUseStoreStateProps,
} from "./index.i";
import MessageEditorContainer from "../MessageEditorContainer";
import MessageListContainer from "../MessageListContainer";
import {connect} from "react-redux";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";
import {SendMessage, SendMsgMetaType} from "../../Store/Action/message.a";

class MessageContainer extends React.Component<MessageContainerPropsInterface, any>{
    protected onSubmit = (val: string, type: MessageTypeEnum) => {
        const { ChatItem, CurrentUser } = this.props;
        this.props.SendMessage({
            type,
            content: {
                text: val
            },
            chatType: 0,
            receiver: ChatItem.id,
            sender: CurrentUser.IMID,
        });
    };
    render() {
        const { ChatItem } = this.props;
        return (
            <div id={'message_container'}>
                <ChatHeader class={'chat_header'} title={ChatItem.name} />
                <MessageListContainer chat={ChatItem} />
                <MessageEditorContainer chat={ChatItem} onSubmit={this.onSubmit} />
            </div>
        )
    }
}


export const MessageContainerUseStoreStates = (state: StoreStatesTypes): MessageContainerUseStoreStateProps => ({
    CurrentUser: state.System.CurrentUser
});
export const MessageContainerUseStoreActions = (dispatch: StoreDispatchHandle): MessageContainerUseStoreActionProps => ({
    SendMessage: (params: SendMsgMetaType) => SendMessage(dispatch, params)
});

export default connect(MessageContainerUseStoreStates, MessageContainerUseStoreActions)(MessageContainer);
