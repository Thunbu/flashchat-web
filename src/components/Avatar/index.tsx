import * as React from 'react';
import Image, {ImageProps} from "../Image";
import * as DefaultAvatar from '../../assets/images/defaultAvatar.png';

interface AvatarComponentProps extends ImageProps {

}

export default class Avatar extends React.Component<AvatarComponentProps, any>{
    render() {
        return (
            <Image { ...this.props } errorImage={DefaultAvatar} />
        )
    }
}
