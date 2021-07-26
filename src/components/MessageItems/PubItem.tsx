import * as React from "react";
import {ListRowProps} from "react-virtualized";
import TextItem from "./TextItem";
import ImageItem from "./ImageItem";
import AudioItem from "./AudioItem";
import VideoItem from "./VideoItem";
import FileItem from "./FileItem";
import UnKnownItem from "./UnKnownItem";
import './PubItem.less';
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageTypeEnum = PublicMessageInteraction.MessageTypeEnum;
import Avatar from "../Avatar";
import {MessageItemProps, RenderMsgItemRowsParams} from "./Index.i";


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
        onLoad: props.onLoad
    });
}

/**
 * @name RenderMsgItemRows
 * @description 渲染 PUBITEM - 消息容器
 * @param {MessageItemInterface} MessageItem - 消息项
 * @param {ListRowProps} props - 虚拟滚动的props
 * @param {RenderMsgItemRowsParams} params - 参数
 * @return {React.ReactNode}
 */
export const RenderMsgItemRows = (
    MessageItem: MessageItemInterface,
    props: ListRowProps,
    params: RenderMsgItemRowsParams
): React.ReactNode => {
    const { CurrentUser, SenderUser, registerChild, onLoad } = params;
    const isMeFlag: boolean = CurrentUser.IMID === MessageItem.sender;
    return (
        <div ref={registerChild} className={`__pub_item ${isMeFlag ? '__isMe' : ''}`} style={props.style}>
            <div className={'__user_avatar'}>
                <Avatar src={SenderUser.avatar} width={42} height={42} round={true} title={SenderUser.name} />
            </div>
            <div className={'__inner_message'}>
                {
                    RenderMsgItemComponent(MessageItem, {
                        style: {},
                        key: props.key,
                        onLoad
                    })
                }
            </div>
        </div>
    );
}
