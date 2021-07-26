import * as React from "react";
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;
import Image from "../Image";
import * as VideoImage from '../../assets/images/index/video_play.svg';
import {MessageItemProps} from "./Index.i";

export interface VideoItemProps extends MessageItemProps {
    Message: MessageItemInterface<MessageForContentChart['3']>
}
export default class VideoItem extends React.Component<VideoItemProps, any>{
    protected onLoad = () => {
        this.props.onLoad();
    };
    render() {
        const { Message } = this.props;
        const { message } = Message;
        return (
            <div className={'__video_item'}>
                <a href={message.videoUrl} target={'_blank'}>
                    <div className={'__mask_item'}>
                        <img src={VideoImage} alt=""/>
                    </div>
                </a>
                <Image src={message.coverUrl} onLoad={this.onLoad}
                       customizeStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        )
    }
}


