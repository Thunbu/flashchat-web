import * as React from "react";
import {ListRowProps} from "react-virtualized";
import TextItem from "./TextItem";
import ImageItem from "./ImageItem";
import AudioItem from "./AudioItem";
import VideoItem from "./VideoItem";
import FileItem from "./FileItem";
import UnKnownItem from "./UnKnownItem";
import {UserInterface} from "../../modules/ChatRoot/Store/Types/users.t";
import './PubItem.less';
import {CurrentUserInterface} from "../../modules/ChatRoot/Store/Types/system.t";
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import Avatar from "../Avatar";

export interface MessageItemProps {
    key: string,
    style: React.CSSProperties
    measure: () => void
}

export const GetMsgItemComponentByMsgType = (msgType: MessageTypeEnum) => {
    switch (msgType) {
        case 0:
            return TextItem;
        case 1:
            return ImageItem;
        case 2:
            return AudioItem;
        case 3:
            return VideoItem;
        case 4:
            return FileItem;
        default:
            return UnKnownItem;
    }
}

export const RenderMsgItemComponent = (MessageItem: MessageItemInterface, props: MessageItemProps): React.ReactNode => {
    return React.createElement(GetMsgItemComponentByMsgType(MessageItem.type), {
        Message: MessageItem,
        style: props.style,
        itemKey: props.key,
        measure: props.measure
    });
}

/**
 * @author PengPeng
 * @date 10/27/20
 * @function
 * @name RenderMsgItemRows
 * @description 渲染 PUBITEM - 消息容器
 * @param {MessageItemInterface} MessageItem - 消息项
 * @param {ListRowProps} props - 虚拟滚动的props
 * @param {UserInterface} CurrentUser - 当前用户信息
 * @param {UserInterface} SenderUser - 发送者信息
 * @param {Function} measure - 重新计算的函数
 * @return {React.ReactNode}
 */

export const RenderMsgItemRows = (
    MessageItem: MessageItemInterface,
    props: ListRowProps,
    CurrentUser: CurrentUserInterface,
    SenderUser: UserInterface,
    measure: () => void
): React.ReactNode => {
    const isMeFlag: boolean = CurrentUser.IMID === MessageItem.sender;
    return (
        <div className={`__pub_item ${isMeFlag ? '__isMe' : ''}`} style={props.style}>
            <div className={'__user_avatar'}>
                <Avatar src={SenderUser.avatar} width={42} height={42} round={true} title={SenderUser.name} />
            </div>
            <div className={'__inner_message'}>
                {
                    RenderMsgItemComponent(MessageItem, {
                        style: {},
                        key: props.key,
                        measure
                    })
                }
            </div>
        </div>
    );
}
