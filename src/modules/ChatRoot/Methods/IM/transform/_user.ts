import {IMGetUsersDataItem} from "../types/_user";
import {UserInterface} from "../../../Store/Types/users.t";

/**
 * @author PengPeng
 * @date 11/3/20
 * @function
 * @name IMUserMessageJoinToLocal
 * @description 将从SDK获取到的user信息转换为本地需要的信息
 * @param {IMGetUsersDataItem} params - IM user信息
 * @return {UserInterface}
 */
export const IMUserMessageJoinToLocal = (params: IMGetUsersDataItem): UserInterface => {
    return {
        avatar: params.avatar,
        name: params.userNickname,
        id: params.userId,
    }
}
