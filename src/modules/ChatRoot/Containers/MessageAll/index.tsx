import * as React from "react";
import { RenderMsgItemRows } from '../../../../components/MessageItems/PubItem';
import {connect} from "react-redux";
import {
    MessageAllPropsInterface,
    MessageAllStateInterface,
    MessageAllUseStoreAction,
    MessageAllUseStoreState
} from "./index.i";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps, ScrollParams} from "react-virtualized";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;
import {RenderedRows} from "react-virtualized/dist/es/List";
import {CurrentUserInterface} from "../../Store/Types/system.t";
import {UserInterface} from "../../Store/Types/users.t";

class MessageAll extends React.Component<MessageAllPropsInterface, MessageAllStateInterface>{
    readonly state = {
        canFetchMoreMessage: true,
        fetchMessageState: 0
    };

    VirtualScroller: List|null = null;
    readonly DefaultCellMeasurerCache = new CellMeasurerCache({
        defaultHeight: 58,
        fixedWidth: true,
        keyMapper: rowIndex => {
            const item = this.GetIndexRow(rowIndex);
            return item ? item.id : '';
        }
    });
    ScrollToLastMsgFlag = false;
    hasMore = true;
    DefaultListScrollParams: ScrollParams = {
        clientHeight: 0,
        clientWidth: 0,
        scrollHeight: 0,
        scrollLeft: 0,
        scrollTop: 0,
        scrollWidth: 0,
    };
    ListScrollParams: ScrollParams = this.DefaultListScrollParams;

    componentDidMount() {
        this.onSwitchChat();
        this.ForceUpdate().then(() => {
            this.ScrollToLastMessage();
        });
    }
    componentDidUpdate(prevProps: Readonly<MessageAllPropsInterface>, prevState: Readonly<MessageAllStateInterface>, snapshot?: any) {
        const chatId = this.props.chat.id;
        if (chatId !== prevProps.chat.id) {
            this.onSwitchChat();
            return true;
        } else if (prevProps.list !== this.props.list) {
            return true;
        }
        return false;
    }
    /**
     * @name: onSwitchChat
     * @Description: 会话切换时的回调，默认要滚动到底部
     * @return: {void}
     */
    onSwitchChat = () => {
        this.hasMore = true;
        this.ListScrollParams = this.DefaultListScrollParams;
        if (this.props.list.length <= 10) {
            this.loadMoreMessageListData().then(() => {
                this.ScrollToLastMessage();
            });
        } else {
            this.ScrollToLastMessage();
        }
    };
    protected GetIndexRow = (index: number): MessageItemInterface => {
        return this.props.list[index];
    }
    /**
     * @name: RenderMsgItemRows
     * @Description: 渲染消息项，会执行的比较频繁，尽量少做计算操作来确保性能
     * @param: {ListRowProps} props - 参数
     * @return: {React.ReactNode}
     */
    protected RenderMsgItemRows = (props: ListRowProps): React.ReactNode => {
        const Message = this.props.list[props.index];
        const { CurrentUser, GetUserInfo } = this.props;
        const SenderUser = GetUserInfo(Message.sender);
        return (
            <CellMeasurer cache={this.DefaultCellMeasurerCache} columnIndex={0}
                          parent={props.parent} key={props.key} rowIndex={props.index}>
                {
                    ({ measure, registerChild }) => (
                        this.RenderMsgItem(
                            Message,
                            props,
                            {
                                CurrentUser,
                                SenderUser,
                                measure,
                                registerChild
                            }
                        )
                    )
                }
            </CellMeasurer>
        );
    };
    protected RenderMsgItem = (MessageItem: MessageItemInterface, props: ListRowProps, params : {
        CurrentUser: CurrentUserInterface,
        SenderUser: UserInterface,
        measure: () => void,
        registerChild: any,
    }) => {
        return RenderMsgItemRows(MessageItem, props, {
            onLoad: () => {
                params.measure();
                this.VirtualScroller!.recomputeGridSize();
            },
            registerChild: params.registerChild,
            CurrentUser: params.CurrentUser,
            SenderUser: params.SenderUser
        });
    }
    /**
     * @name: ScrollToLastMessage
     * @Description: 滚动至最底部
     * @return: void
     */
    protected ScrollToLastMessage = () => {
        if (this.props.list.length && this.VirtualScroller) {
            this.VirtualScroller.scrollToRow(this.props.list.length - 1);
            this.ScrollToLastMsgFlag = true;
        }
    };
    /**
     * @name: ForceUpdate
     * @Description: 强制清除所有item的高度缓存，重新计算容器大小
     * @return: void
     */
    protected ForceUpdate = () => {
        console.log('[TIPS] force update list');
        // 脱离执行流
        return new Promise((resolve) => {
            this.DefaultCellMeasurerCache.clearAll();
            if (this.VirtualScroller) {
                this.VirtualScroller.recomputeGridSize();
            }
            resolve();
        });
    };
    /**
     * @name: onListScroll
     * @Description: 列表滚动的时候触发，执行比较频繁
     * @param: {ScrollParams} params - 滚动位置
     * @return: {void}
     */
    protected onListScroll = (params: ScrollParams) => {
        console.log('on Scroll', params);
        this.ScrollToLastMsgFlag = false;
        this.ListScrollParams = params;
        if (params.scrollTop + params.clientHeight >= params.scrollHeight) {
            // 滑动到最底部
            console.log('[TIPS] 列表滚动至最底部', true);
            this.ScrollToLastMsgFlag = true;
        }
    };
    /**
     * @name: onRowsRendered
     * @Description: 当某一行渲染完毕之后执行的回调，会执行的比较频繁，用于重新计算当前滚动位置，使其不闪烁
     * @param: {RenderedRows} params
     * @return: void
     */
    protected onRowsRendered = (params: RenderedRows) => {
        if (this.ScrollToLastMsgFlag) {
            this.ScrollToLastMessage();
        }
    };
    protected loadMoreMessageListData = () => {
        return new Promise((resolve, reject) => {
            const { fetchMessageState } = this.state;
            if ((fetchMessageState === 0 || fetchMessageState === 2) && this.hasMore) {
                // 请求状态为未在请求
                this.setState({
                    fetchMessageState: 1,
                }, () => {
                    const { chat, list } = this.props;
                    this.props.LoadMessageList({
                        chatId: chat.id,
                        chatType: chat.type,
                        securityType: 0,
                        rows: 30,
                        direct: 1,
                        msgId: list[0] ? list[0].id : undefined
                    }).then((result) => {
                        if (result.length < 29) {
                            // 没有更多了
                            this.hasMore = false;
                        }
                        this.setState({
                            fetchMessageState: 2
                        });
                        resolve(result);
                    }).catch((err: any) => {
                        console.log('[ERRS] Get online message list error!', err);
                        reject(err);
                        this.setState({
                            fetchMessageState: -1
                        });
                    });
                });
            }
        })
    }
    render() {
        const { list } = this.props;
        return (
            <div id={'message_outer_container'}>
                <AutoSizer>
                    {
                        ({width, height}) => (
                            <List
                                ref={(ref: any) => this.VirtualScroller = ref}
                                width={width}
                                height={height}
                                rowCount={list.length}
                                rowHeight={this.DefaultCellMeasurerCache.rowHeight}
                                deferredMeasurementCache={this.DefaultCellMeasurerCache}
                                style={{ outline: 'none' }}
                                onScroll={this.onListScroll}
                                rowRenderer={this.RenderMsgItemRows}
                                onRowsRendered={this.onRowsRendered} />
                        )
                    }
                </AutoSizer>
            </div>
        )
    }
}

export default connect(MessageAllUseStoreState, MessageAllUseStoreAction)(MessageAll);
