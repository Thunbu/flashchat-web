/**
 * @author: PengPeng
 * @date: 12/30/20
 * @function
 * @name: SetLoginInformation
 * @Description: 设置登录信息
 * @param: {LoginInformation} loginInfo - 登录信息
 * @return: {boolean} success - 是否设置成功
 */
import {LoginInformation} from "./types/_index";

export const SetLoginInformation = (loginInfo: LoginInformation) => {
    const { USERIMID, USERSIG } = loginInfo;
    window.localStorage.setItem('USERSIG', USERSIG);
    window.localStorage.setItem('USERIMID', USERIMID);
}
