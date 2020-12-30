
/**
 * @author: PengPeng
 * @date: 12/30/20
 * @function
 * @name: CleanLocalLoginInformation
 * @Description: 清除本地登录信息
 * @return: {void}
 */
export const CleanLocalLoginInformation = () => {
    window.localStorage.removeItem('USERSIG');
    window.localStorage.removeItem('USERIMID');
}
