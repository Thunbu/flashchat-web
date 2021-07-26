import {CurrentUserInterface} from "../../modules/ChatRoot/Store/Types/system.t";
import {UserInterface} from "../../modules/ChatRoot/Store/Types/users.t";
import * as React from "react";

/**
 * @name RenderMsgItemRowsParams
 * @property {UserInterface} SenderUser - 发送者信息
 * @property {Function} measure - 重新计算的函数
 * @property {any} registerChild - 注册节点
 * @property {Function} onLoad - 加载完成的回调
 */
export interface RenderMsgItemRowsParams {
    CurrentUser: CurrentUserInterface,
    SenderUser: UserInterface,
    onLoad: () => void,
    registerChild: any
}

/**
 * @name: MessageItemProps
 * @property {string} key - key
 * @property {React.CSSProperties} style - 样式
 * @property {Function} onLoad - 渲染完成
 */
export interface MessageItemProps {
    key: string,
    style: React.CSSProperties,
    onLoad: () => void
}
