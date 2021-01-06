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
    mountedScrollToLastMsgFlag = false;
    hasMore = true;

    componentDidMount() {
        this.onSwitchChat();
        this.ForceUpdate().then(() => {
            this.ScrollToLastMessage();
        });
    }
    onSwitchChat = () => {
        if (this.props.list.length <= 10) {
            this.loadMoreMessageListData().then(() => {
                this.ComputeLastMessageHeight();
                this.ScrollToLastMessage();
            })
        }
    };
    componentDidUpdate(prevProps: Readonly<MessageAllPropsInterface>, prevState: Readonly<MessageAllStateInterface>, snapshot?: any) {
        // todo: 当上一次的props长度为30条的时候，说明这次的更新会导致第一条消息消失，所以，要将第一条消息的高度缓存清除，然后更新最后一条消息的缓存
        const chatId = this.props.chat.id;
        if (chatId !== prevProps.chat.id) {
            this.hasMore = true;
            this.onSwitchChat();
            // this.mountedScrollToLastMsgFlag = false;
            // this.ForceUpdate().then(() => {
            //     this.ScrollToLastMessage();
            // });
            return true;
        } else if (prevProps.list !== this.props.list) {
            // if (!this.mountedScrollToLastMsgFlag) {
            //     this.ComputeLastMessageHeight();
            //     this.ScrollToLastMessage();
            //     this.mountedScrollToLastMsgFlag = true;
            // }
            return true;
        }
        return false;
    }
    protected GetIndexRow = (index: number): MessageItemInterface => {
        return this.props.list[index];
    }
    protected RenderMsgItemRows = (props: ListRowProps): React.ReactNode => {
        const Message = this.props.list[props.index];
        const { CurrentUser, GetUserInfo } = this.props;
        const SenderMsg = GetUserInfo(Message.sender);
        return (
            <CellMeasurer cache={this.DefaultCellMeasurerCache} columnIndex={0}
                          parent={props.parent} key={props.key} rowIndex={props.index}>
                {
                    ({ measure, registerChild }) => (
                        RenderMsgItemRows(
                            Message,
                            props,
                            CurrentUser,
                            SenderMsg,
                            measure,
                            registerChild
                        )
                    )
                }
            </CellMeasurer>
        );
    }
    protected ComputeLastMessageHeight = () => {
        if (this.VirtualScroller) {
            this.VirtualScroller.recomputeRowHeights(0);
            this.VirtualScroller.recomputeRowHeights(this.props.list.length - 1);
        }
    };
    protected ScrollToLastMessage = () => {
        if (this.props.list.length && this.VirtualScroller) {
            this.VirtualScroller.scrollToRow(this.props.list.length - 1);
        }
    };
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
    protected onListScroll = (params: ScrollParams) => {
        if (params.scrollTop + params.clientHeight >= params.scrollHeight) {
            // 滑动到最底部
            console.log('[TIPS] 列表滚动至最底部', true);
        }
    };
    protected onRowsRendered = (params: RenderedRows) => {
        if (params.startIndex <= 10) {
            // 需要加载新的数据
            console.log('[TIPS] Should load more data');
            this.loadMoreMessageListData();
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
