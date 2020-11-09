import * as React from "react";
import {MessageLocalInteraction, PublicMessageInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import MessageForContentChart = PublicMessageInteraction.MessageForContentChart;

export interface TextItemPropsInterface {
    Message: MessageItemInterface<MessageForContentChart['0']>
}

export default class TextItem extends React.Component<TextItemPropsInterface, any>{
    render() {
        const { Message } = this.props;
        return (
            <div className={'__text_item'}>
                <p>{Message.message.text}</p>
            </div>
        )
    }
}


