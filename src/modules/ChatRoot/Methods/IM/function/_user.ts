import {IMGetUsersDataItem, IMGetUsersDataParams} from "../types/_user";

/**
 * @author PengPeng
 * @date 11/2/20
 * @function
 * @name IM_GetMultiPersonalData
 * @description SDK获取人员信息
 * @param {IMGetUsersDataParams} params - 参数
 * @return {Promise<IMGetUsersDataItem[]>}
 */
export const IM_GetMultiPersonalData = (params: IMGetUsersDataParams): Promise<IMGetUsersDataItem[]> => {
    return new Promise<IMGetUsersDataItem[]>((resolve, reject) => {
        window.SIM.getMultiPersonalData(params, resolve, reject);
    });
}
