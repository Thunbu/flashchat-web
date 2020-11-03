/**
 * @author PengPeng
 * @date 11/2/20
 * @typedef SIMLoginParams
 * @description IM登录参数
 * @property {string} appId
 * @property {string} terminal
 * @property {string} userId
 * @property {string} account
 * @property {string} userSig
 * @property {string} appversion
 * @property {boolean} isForce
 */
export interface SIMLoginParams {
    appId: string,
    terminal: string,
    userId: string,
    account: string,
    userSig: string,
    appversion: string,
    isForce: boolean
}
