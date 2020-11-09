import * as React from "react";
import * as DefaultAvatar from '../../assets/images/defaultAvatar.png';
import './index.less'
import {CSSProperties} from "react";

export interface ImageProps {
    src: string,
    width?: number | string,
    height?: number | string,
    radius?: number | string,
    round?: boolean,
    alt?: string,
    title?: string,
    errorImage?: string,
    onLoad?: () => void,
    onError?: () => void,
    fit?: "contain" | "cover" | "fill" | "none" | "scale-down",
    customizeStyle?: CSSProperties
}

export interface ImageState {
    errorFlag: boolean
}

export default class Image extends React.Component<ImageProps, ImageState> {
    static defaultProps = {
        src: '',
        round: false,
        radius: '4px',
        alt: '',
        title: '',
        fit: 'cover',
        errorImage: '',
        customizeStyle: {},
        onLoad: () => {},
        onError: () => {},
    };
    readonly state: ImageState = {
        errorFlag: false
    }
    protected onError = () => {
        this.props.onError!();
        console.log('图片加载失败：', this.props.src);
        if (!this.state.errorFlag) {
            this.setState({
                errorFlag: true
            });
        }
    }
    protected onLoad = () => {
        this.props.onLoad!();
    }

    render() {
        const {src, alt, title, round, radius, width, height, customizeStyle, errorImage, fit} = this.props;
        const {errorFlag} = this.state;
        return (!errorFlag || (errorFlag && errorImage))
            ?
            (
                <img src={(errorFlag || !src) ? DefaultAvatar : src} alt={alt}
                     title={title} onError={this.onError}
                     onLoad={this.onLoad}
                     style={{
                         borderRadius: round ? '50%' : (radius || 0),
                         width: width ? width : 'unset',
                         height: height ? height : 'unset',
                         objectFit: fit,
                         ...customizeStyle
                     }}/>
            )
            :
            (
                <div className={'__image_component__error_image'}>
                    <p>加载失败</p>
                </div>
            )
    }
}
