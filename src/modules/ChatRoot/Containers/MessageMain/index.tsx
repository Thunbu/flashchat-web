import * as React from "react";
import {connect} from "react-redux";
import EmptySpace from "../../../../components/EmptySpace";
import {
    MessageMainPropsInterface,
    MessageMainStateInterface,
    MessageMainUseStoreActionsInterface,
    MessageMainUseStoreStatesInterface
} from "./index.i";
import MessageContainer from "../MessageContainer";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";

class MessageMain extends React.Component<MessageMainPropsInterface, MessageMainStateInterface>{
    render() {
        const { GetChatItemByKey, ActiveChat } = this.props;
        const ChatItem = GetChatItemByKey(ActiveChat);
        return (
            <div id={'message_main'}>
                {
                    ChatItem && ChatItem.id
                        ? <MessageContainer ChatItem={ChatItem} />
                        : <EmptySpace text={'请选择左侧会话'} className={'empty_page'} />
                }
            </div>
        );
    }
}


export const MessageMainUseStoreStates = (state: StoreStatesTypes): MessageMainUseStoreStatesInterface => ({
    ActiveChat: state.ChatList.active,
    GetChatItemByKey: (key: string) => state.ChatList.listMap[key]
});
export const MessageMainUseStoreActions = (dispatch: StoreDispatchHandle): MessageMainUseStoreActionsInterface => ({

});

export default connect(MessageMainUseStoreStates, MessageMainUseStoreActions)(MessageMain);
