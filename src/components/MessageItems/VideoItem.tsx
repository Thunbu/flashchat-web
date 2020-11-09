import * as React from "react";
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;
import {MessageItemProps} from "./PubItem";
import Image from "../Image";

export interface VideoItemProps extends MessageItemProps {
    Message: MessageItemInterface<MessageForContentChart['3']>
}
export default class VideoItem extends React.Component<VideoItemProps, any>{
    componentDidMount() {
        console.log(this.props);
    }

    protected onLoad = () => {
        this.props.measure();
    };
    render() {
        const { Message } = this.props;
        const { message } = Message;
        return (
            <div className={'__video_item'}>
                <a href={message.videoUrl} target={'_blank'}>
                    <div className={'__mask_item'}>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="12373" width="80" height="80">
                            <path
                                d="M512 981.333333C252.8 981.333333 42.666667 771.2 42.666667 512S252.8 42.666667 512 42.666667s469.333333 210.133333 469.333333 469.333333-210.133333 469.333333-469.333333 469.333333z m0-85.333333a384 384 0 1 0 0-768 384 384 0 0 0 0 768z m-170.666667-170.666667V298.666667a42.666667 42.666667 0 0 1 65.28-36.181334l341.333334 213.333334a42.666667 42.666667 0 0 1 0 72.362666l-341.333334 213.333334A42.666667 42.666667 0 0 1 341.333333 725.333333z m303.488-213.333333L426.666667 375.637333v272.725334L644.821333 512z"
                                p-id="12374" fill="#ffffff"></path>
                        </svg>
                    </div>
                </a>
                <Image src={message.coverUrl} onLoad={this.onLoad}
                       customizeStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        )
    }
}


