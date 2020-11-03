/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetUsersDataItem
 * @description SDK 获取到的人员信息的返回类型
 * @property {string} avatar - 头像
 * @property {string} createTime - 创建时间
 * @property {string} userNickname - 用户姓名
 * @property {string} nicknamePy - 姓名拼音
 * @property {number} userStatus - 人员状态
 * @property {string} userId - 用户IMID
 */
export interface IMGetUsersDataItem {
    avatar: string,
    createTime: string,
    userNickname: string,
    nicknamePy: string,
    userStatus: number,
    userId: string
}
/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef IMGetUsersDataParams
 * @description SDK 获取人员信息方法的参数类型
 * @property {string[]} userIds
 */
export interface IMGetUsersDataParams {
    userIds: string[]
}
