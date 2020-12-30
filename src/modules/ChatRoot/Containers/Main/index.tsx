import * as React from "react";
import LeftMenu from "../LeftMenu";
import ChatOuter from "../ChatOuter";
import {connect} from "react-redux";
import {MainProps, MainState, MainStoreAction, MainStoreProps} from "./index.s";
import {InitSIM, ListenSIMEvents, LoginSIM, SIMLoginError} from "../../Methods/IM/im";
import {IM_GetMultiPersonalData} from "../../Methods/IM/function/_user";
import {IM_GetChatSessionList} from "../../Methods/IM/function/_chat";
import {SIMLoginErrorParams} from "../../Methods/IM/types/_login";

class Main extends React.Component<MainProps, MainState> {
    readonly state = {};
    componentDidMount() {
        this.RunInit();
    };
    protected RunInit = () => {
        InitSIM().then(() => {
            console.log('websocket 初始化成功');
            this.RunLogin();
        }).catch((err) => {
            console.error('websocket 初始化失败', err);
        });
    }
    protected RunLogin = () => {
        const UserId = this.props.UserIMID;
        const UserSig = this.props.UserSig;
        LoginSIM(UserId, UserSig).then((res) => {
            console.log('websocket 登录成功----', res);
            ListenSIMEvents();
            this.getLoginUserInfo();
            this.fetchChatList();
        }).catch((err: SIMLoginErrorParams) => {
            SIMLoginError(err);
            console.log('websocket 登录失败----', err);
        });
    };
    protected getLoginUserInfo = () => {
        const userId = this.props.UserIMID;
        IM_GetMultiPersonalData({
            userIds: [ userId ]
        }).then((res) => {
            const userInfo = res[0];
            this.props.UpdateCurrentUserInfo({
                avatar: userInfo.avatar,
                userId: userInfo.userId,
                userNickName: userInfo.userNickname,
            });
        }).catch((err: any) => {
            console.error('获取登录人员信息失败！', err);
        });
    }
    protected fetchChatList = () => {
        IM_GetChatSessionList({}).then((res) => {
            this.props.SetChatListByResponse(res);
        });
    };
    render() {
        return (
            <div id={'chat_base_container'}>
                <LeftMenu />
                <ChatOuter />
            </div>
        );
    }
}

export default connect(MainStoreProps, MainStoreAction)(Main);
