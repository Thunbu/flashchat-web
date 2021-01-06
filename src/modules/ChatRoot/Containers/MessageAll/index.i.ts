import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";
import {UserInterface} from "../../Store/Types/users.t";
import {DefaultUser} from "../../Store/Data/users.data";
import {CurrentUserInterface} from "../../Store/Types/system.t";
import {ExternalInteraction, MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import IMGetMessageListParams = ExternalInteraction.IMGetMessageListParams;
import {ChatItemInterface} from "../../Store/Types/chatList.t";
import {SIM_FetchMessageList} from "../../Methods/IM/im_message";

export interface MessageAllUseStoreStateInterface {
    CurrentUser: CurrentUserInterface,
    GetUserInfo(userId: string): UserInterface
}
export interface MessageAllUseStoreActionInterface {
    LoadMessageList: (params: IMGetMessageListParams) => Promise<any>
}
export type MessageAllUseStoreInterface = MessageAllUseStoreActionInterface & MessageAllUseStoreStateInterface;

export interface MessageAllPropsInterface extends MessageAllUseStoreInterface {
    list: MessageItemInterface[],
    chat: ChatItemInterface
}
export interface MessageAllStateInterface {
    canFetchMoreMessage: boolean, // 是否能够从远程获取消息列表
    fetchMessageState: number, // 从线上拉取消息的状态， -1 - 接口请求失败，0 - 接口未执行，1 - 接口请求中， 2 - 接口请求完成
}

export const MessageAllUseStoreAction = (dispatch: StoreDispatchHandle): MessageAllUseStoreActionInterface => ({
    LoadMessageList: (params: IMGetMessageListParams) => {
        return SIM_FetchMessageList(params).then((result) => {
            return result;
        });
    }
});
export const MessageAllUseStoreState = (state: StoreStatesTypes): MessageAllUseStoreStateInterface => ({
    CurrentUser: state.System.CurrentUser,
    GetUserInfo: (userId: string) => state.Users.UserMap[userId] || DefaultUser,
});
