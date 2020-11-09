import * as React from "react";
import './index.less';
import * as VideoImage from '../../assets/images/index/Video.svg';
import * as ImageIcon from '../../assets/images/index/Image.svg';

export interface EditorToolBarProps {
    sendVideoMessage: () => void,
    sendImageMessage: () => void,
    className?: string
}
export default class EditorToolBar extends React.Component<EditorToolBarProps, any>{
    render() {
        return (
            <div className={`__editor_tool_bar ${this.props.className}`}>
                <div className={'__handle_item'} onClick={this.props.sendVideoMessage}>
                    <img src={VideoImage} alt=""/>
                </div>
                <div className={'__handle_item'} onClick={this.props.sendImageMessage}>
                    <img src={ImageIcon} alt=""/>
                </div>
            </div>
        )
    }
}

