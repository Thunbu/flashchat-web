import * as React from "react";
import {
    MessageEditorContainerProps, MessageEditorStateInterface, MessageEditorUseStoreActionProps,
    MessageEditorUseStoreStateProps
} from "./index.s";
import EditorToolBar from "../../../../components/EditorToolBar";
import EditorComponent from "../../../../components/EditorComponent";
import {PublicMessageInteraction} from "../../Methods/IM/types/_message";
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import ImageMessageContentsItem = PublicMessageInteraction.ImageMessageContentsItem;
import {connect} from "react-redux";
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;
import {DefaultMessageItemEnum} from "../../dafault.data";

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

export default connect(MessageEditorUseStoreStateProps, MessageEditorUseStoreActionProps)(MessageEditorContainer);
