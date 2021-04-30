import * as React from "react";
import {connect} from "react-redux";
import {
    ChatMainPropsTypes,
    ChatMainStateTypes,
    ChatMainUseStoreActionTypes,
    ChatMainUseStoreStateTypes
} from "./index.i";
import ChatList from "../ChatList";
import MessageMain from "../MessageMain";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";

class ChatMain extends React.Component<ChatMainPropsTypes, ChatMainStateTypes> {
    render() {
        return (
            <div id={'chat_main'}
                 className={
                     `${
                         this.props.ActiveContainer === this.props.containerName ? 'active' : ''
                     }`
                 }>
                <div id={'chat_main_container'}>
                    <ChatList />
                    <MessageMain />
                </div>
            </div>
        );
    }
}

export const ChatMainUseStoreState = (state: StoreStatesTypes): ChatMainUseStoreStateTypes => ({
    ActiveContainer: state.System.active
});
export const ChatMainUseStoreAction = (dispatch: StoreDispatchHandle): ChatMainUseStoreActionTypes => ({

});
export default connect(ChatMainUseStoreState, ChatMainUseStoreAction)(ChatMain);
