import * as React from "react";
import {
    MessageLocalInteraction,
    PublicMessageInteraction
} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;
import Image from "../Image";
import ImageMessageContentsItem = PublicMessageInteraction.ImageMessageContentsItem;
import {MessageItemProps} from "./PubItem";

interface ImageItemProps extends MessageItemProps {
    Message: MessageItemInterface<MessageForContentChart['1']>,
}

export default class ImageItem extends React.Component<ImageItemProps, any>{
    componentDidMount() {
        console.log(this.props);
    }

    protected getPreviewImageURL = (imageList: ImageMessageContentsItem[]) => {
        for (let i = 0; i < imageList.length; i++) {
            if (imageList[i].type === 2) {
                return imageList[i];
            }
        }
        return imageList[0];
    }
    protected onLoad = () => {
        this.props.measure();
    }
    render() {
        const { Message } = this.props;
        const { imageList } = Message.message;
        const PreviewImage = this.getPreviewImageURL(imageList);
        return (
            <div className={'__image_item'}>
                <Image src={PreviewImage.url} onLoad={this.onLoad}
                       customizeStyle={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        )
    }
}


