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

class MessageAll extends React.Component<MessageAllPropsInterface, MessageAllStateInterface>{
    VirtualScroller: List|null = null;
    readonly DefaultCellMeasurerCache = new CellMeasurerCache({
        defaultHeight: 58,
        fixedWidth: true,
    });
    readonly state = {};
    rowIndex: number = -1;

    componentDidMount() {
        this.ForceUpdate().then(() => {
            this.ScrollToLastMessage();
        });
    }

    componentDidUpdate(prevProps: Readonly<MessageAllPropsInterface>, prevState: Readonly<MessageAllStateInterface>, snapshot?: any) {
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

    protected RenderMsgItemRows = (props: ListRowProps): React.ReactNode => {
        const Message = this.props.list[props.index];
        const { CurrentUser, GetUserInfo } = this.props;
        const SenderMsg = GetUserInfo(Message.sender);
        return (
            <CellMeasurer cache={this.DefaultCellMeasurerCache} columnIndex={0}
                          parent={props.parent} key={props.key} rowIndex={props.index}>
                {
                    RenderMsgItemRows(
                        Message,
                        props,
                        CurrentUser,
                        SenderMsg
                    )
                }
            </CellMeasurer>
        );
    }
    protected ComputeLastMessageHeight = () => {
        if (this.VirtualScroller) {
            // this.DefaultCellMeasurerCache.clear(this.props.list.length, 0);
            this.VirtualScroller.recomputeRowHeights(this.props.list.length);
        }
    };
    protected ScrollToLastMessage = () => {
        if (this.props.list.length && this.VirtualScroller) {
            this.VirtualScroller!.scrollToRow(this.props.list.length);
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
                    {({width, height}) => (
                        <List
                            ref={(ref: any) => this.VirtualScroller = ref}
                            width={width}
                            height={height}
                            rowCount={list.length}
                            rowHeight={this.DefaultCellMeasurerCache.rowHeight}
                            deferredMeasurementCache={this.DefaultCellMeasurerCache}
                            style={{ outline: 'none' }}
                            rowRenderer={this.RenderMsgItemRows} />
                    )}
                </AutoSizer>
            </div>
        )
    }
}

export default connect(MessageAllUseStoreState, MessageAllUseStoreAction)(MessageAll);
