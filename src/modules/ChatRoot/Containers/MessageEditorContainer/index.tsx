import * as React from "react";
import {
    MessageEditorContainerProps,
    MessageEditorStateInterface,
    MessageEditorUseStoreActionPropsInterface,
    MessageEditorUseStoreStatePropsInterface, SendMsgExtParams
} from "./index.i";
import EditorToolBar from "../../../../components/EditorToolBar";
import EditorComponent from "../../../../components/EditorComponent";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import {connect} from "react-redux";
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;
import {DefaultMessageItemEnum} from "../../dafault.data";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";
import {SendMessage} from "../../Store/Action/message.a";

class MessageEditorContainer extends
    React.Component<
        MessageEditorContainerProps,
        MessageEditorStateInterface
    >{
    constructor(props: MessageEditorContainerProps) {
        super(props);
    }
    protected onSubmit = (val: string, type: MessageTypeEnum) => {
        if (val) {
            this.props.onSubmit(val, type);
        }
    }
    protected sendImageMessage = () => {
        const MessageContent: MessageForContentChart['1'] = DefaultMessageItemEnum.image;
        const ChatItem = this.props.GetChatItemByKey(this.props.ActiveChat);
        this.props.SendMsg<MessageForContentChart['1']>(MessageContent, 1, {
            receiver: ChatItem.id,
            chatType: ChatItem.type,
            sender: this.props.CurrentUser.IMID
        });
    };
    protected sendVideoMessage = () => {
        const MessageContent: MessageForContentChart['3'] = DefaultMessageItemEnum.video;
        const ChatItem = this.props.GetChatItemByKey(this.props.ActiveChat);
        this.props.SendMsg<MessageForContentChart['3']>(MessageContent, 3, {
            receiver: ChatItem.id,
            chatType: ChatItem.type,
            sender: this.props.CurrentUser.IMID
        });
    }
    render() {
        return (
            <div id={'message_editor_container'}>
                <EditorToolBar className={'tool_bar'} sendVideoMessage={this.sendVideoMessage}
                               sendImageMessage={this.sendImageMessage} />
                <EditorComponent className={'editor_component'}
                                 onSubmit={(val) => this.onSubmit(val, 0)} />
            </div>
        );
    }
}


export const MessageEditorUseStoreStateProps = (state: StoreStatesTypes)
    : MessageEditorUseStoreActionPropsInterface => ({
    ActiveChat: state.ChatList.active,
    GetChatItemByKey: (key: string) => state.ChatList.listMap[key],
    CurrentUser: state.System.CurrentUser
});
export const MessageEditorUseStoreActionProps = (dispatch: StoreDispatchHandle)
    : MessageEditorUseStoreStatePropsInterface => ({
    SendMsg: <T extends {}>(content: T, type: MessageTypeEnum, params: SendMsgExtParams): void => {
        SendMessage<T>(dispatch, {
            content,
            type,
            receiver: params.receiver,
            chatType: params.chatType,
            sender: params.sender,
        })
    }
})
export default connect(MessageEditorUseStoreStateProps, MessageEditorUseStoreActionProps)(MessageEditorContainer);
