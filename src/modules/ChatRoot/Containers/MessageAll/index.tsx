import * as React from "react";
import { RenderMsgItemRows } from '../../../../components/MessageItems/PubItem';
import {connect} from "react-redux";
import {
    MessageAllPropsInterface,
    MessageAllStateInterface,
    MessageAllUseStoreAction,
    MessageAllUseStoreState
} from "./index.i";
import {AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps} from "react-virtualized";
import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;

class MessageAll extends React.Component<MessageAllPropsInterface, MessageAllStateInterface>{
    VirtualScroller: List|null = null;
    readonly DefaultCellMeasurerCache = new CellMeasurerCache({
        defaultHeight: 58,
        fixedWidth: true,
        keyMapper: rowIndex => this.GetIndexRow(rowIndex).id
    });
    readonly state = {};

    componentDidMount() {
        this.ForceUpdate().then(() => {
            this.ScrollToLastMessage();
        });
    }

    componentDidUpdate(prevProps: Readonly<MessageAllPropsInterface>, prevState: Readonly<MessageAllStateInterface>, snapshot?: any) {
        // todo: 当上一次的props长度为30条的时候，说明这次的更新会导致第一条消息消失，所以，要将第一条消息的高度缓存清除，然后更新最后一条消息的缓存
        if (this.props.chatId !== prevProps.chatId) {
            this.ForceUpdate().then(() => {
                this.ScrollToLastMessage();
            });
        } else if (prevProps.list !== this.props.list) {
            this.ComputeLastMessageHeight();
            this.ScrollToLastMessage();
        } else {
            return false;
        }
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
                    ({ measure }) => (
                        RenderMsgItemRows(
                            Message,
                            props,
                            CurrentUser,
                            SenderMsg,
                            measure
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
            this.VirtualScroller!.scrollToRow(this.props.list.length - 1);
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
                                rowRenderer={this.RenderMsgItemRows} />
                        )
                    }
                </AutoSizer>
            </div>
        )
    }
}

export default connect(MessageAllUseStoreState, MessageAllUseStoreAction)(MessageAll);
