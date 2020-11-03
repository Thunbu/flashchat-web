import * as React from "react";
import {MessageLocalInteraction} from "../../modules/ChatRoot/Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;

export interface TextItemPropsInterface {
    itemKey: string,
    Message: MessageItemInterface
}

export default class TextItem extends React.Component<TextItemPropsInterface, any>{
    render() {
        return (
            <div key={this.props.itemKey} className={'__text_item'}>
                <p>{this.props.Message.message.text}</p>
            </div>
        )
    }
}


