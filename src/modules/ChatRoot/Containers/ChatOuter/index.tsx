import * as React from "react";
import {connect} from "react-redux";
import {
    ChatOuterPropsTypes,
    ChatOuterStateTypes,
    ChatOuterUseStoreActionsMapTypes,
    ChatOuterUseStoreStateMapTypes
} from "./index.i";
import {RenderChatContainerComponent} from "../../Methods";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";

class ChatOuter extends React.Component<ChatOuterPropsTypes, ChatOuterStateTypes> {
    render() {
        return (
            <div id={'chat_outer'}>
                {RenderChatContainerComponent()}
            </div>
        );
    }
}


export const ChatOuterUseStoreStateMap = (state: StoreStatesTypes): ChatOuterUseStoreStateMapTypes => ({
    Containers: state.System.Containers
});
export const ChatOuterUseStoreActionsMap = (dispatch: StoreDispatchHandle): ChatOuterUseStoreActionsMapTypes => ({

});

export default connect(ChatOuterUseStoreStateMap, ChatOuterUseStoreActionsMap)(ChatOuter);
