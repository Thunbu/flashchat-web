import * as React from "react";
import './index.less';
import {ChatItemInterface} from "../../modules/ChatRoot/Store/Types/chatList.t";
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import Avatar from "../Avatar";
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;

export interface ChatListItemPropsType {
    onClick: (event: React.MouseEvent, activeChat: ChatItemInterface) => void;
    activeId: string,
    chat: ChatItemInterface,
    lastMsg: MessageItemInterface|undefined
}

export default class ChatListItem extends React.Component<ChatListItemPropsType, any>{
    protected ShowLastMessage = (Message: ChatListItemPropsType['lastMsg']) => {
        if (Message) {
            switch (Message.type) {
                case 0:
                    return (Message.message as MessageForContentChart['0']).text;
                case 1:
                    return '[图片]';
                case 3:
                    return '[视频]';
            }
        } else {
            return '';
        }
    }
    render() {
        const { activeId, chat, onClick, lastMsg } = this.props;
        const { id, name, time, avatar } = chat;
        return (
            <div className={`__chat_list_item ${activeId === id ? 'active' : ''}`}
                 onClick={(event: React.MouseEvent) => onClick(event, chat)} title={name}>
                <div className={'__avatar_container'}>
                    <Avatar width={42} height={42} round={true} src={avatar} />
                </div>
                <div className={'__chat_message'}>
                    <div className={'__chat_name'}>
                        <p className={'__name'}>{name}</p>
                        <span className={'__time'}>{time}</span>
                    </div>
                    <p className={'__chat_news'}>{this.ShowLastMessage(lastMsg)}</p>
                </div>
            </div>
        )
    }
}
