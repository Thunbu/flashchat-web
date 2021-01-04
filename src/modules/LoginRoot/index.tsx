import * as React from "react";
import * as ReactDOM from "react-dom";
import { GetLoginUserInfo } from "./Apis";
import { SetLoginInformation } from "./Methods/Login";
import { UserList } from "./config";
import Avatar from "../../components/Avatar";

import './index.less';

const RunLogin = (userId: string): void => {
    GetLoginUserInfo(userId).then((res: any) => {
        if (res.data) {
            SetLoginInformation({ USERSIG: res.data, USERIMID: userId });
            window.location.href = './index.html';
        } else {
            window.alert('用户信息不存在！');
            // Login();
        }
    }).catch((err) => {
        alert('登录失败！');
    });
}
class AppLogin extends React.Component<any, any> {
    state = {
        userId: '',
    }
    componentDidMount() {
        window.localStorage.clear();
    }
    protected onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.onLogin(this.state.userId);
        }
    }
    protected onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userId: event.target.value
        });
    };
    protected onLogin = (userId: string) => {
        RunLogin(userId);
    }
    render() {
        return (
            <div className={'login_root'}>
                <div className={'page_title'}>
                    <h1>Thunbu</h1>
                </div>
                <div className={'user_input'}>
                    <input type="text" onKeyDown={this.onInputKeyDown}
                           onChange={this.onInputChange}
                           value={this.state.userId} placeholder={'输入用户ID，或者选择账号登录'} />
                </div>
                <div className={'user_select'}>
                    {
                        UserList.map((item, index) => (
                            <div className={'user_item'} key={index} onClick={() => {this.onLogin(item.userIMId)}}>
                                <div className={'user_avatar'}>
                                    <Avatar src={item.userAvatar} width={48} height={48} radius={'50%'} />
                                </div>
                                <div className={'user_name'}>{item.userName}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default () => {
    ReactDOM.render(
        <AppLogin />,
        document.getElementById('root')
    );
}


