import * as React from "react";
import * as NoDataImage from '../../assets/images/no_data.png';
import './index.less'

export interface EmptySpaceProps {
    showImage: string,
    text: string,
    className?: string
}
export interface EmptySpaceState {

}

export default class EmptySpace extends React.Component<EmptySpaceProps, EmptySpaceState> {
    static defaultProps = {
        showImage: NoDataImage,
        text: '无内容',
    }
    render() {
        const { showImage, text, className } = this.props;
        return (
            <div className={`__empty_space ${className!}`}>
                <img src={showImage} alt="无数据" />
                <p>{text}</p>
            </div>
        )
    }
}
