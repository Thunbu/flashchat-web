import * as React from "react";
import LeftMenuTabItem from "../../../../components/LeftMenuTabItem";
import {connect} from "react-redux";
import {
    LeftMenuInheritStoreStates,
    LeftMenuProps,
    LeftMenuUseStoreActions
} from "./index.i";
import {TabContainers} from "../../Store/Types/system.t";
import Avatar from "../../../../components/Avatar";
import {StoreDispatchHandle, StoreStatesTypes} from "../../Store/store.i";
import {UpdateActiveContainer} from "../../Store/Action/system.a";

class LeftMenu extends React.Component<LeftMenuProps, any> {
    protected onLeftMenuClick = (menuId: TabContainers) => {
        this.props.UpdateActiveContainer(menuId);
    };
    render() {
        const { Containers, ActiveContainer, CurrentUserAvatar } = this.props;
        return (
            <div id={'left_menu'}>
                <div className={'user_avatar'}>
                    <Avatar src={CurrentUserAvatar}
                           width={32} height={32} round={true} />
                </div>
                <div className={'tab_switch'}>
                    {
                        Containers.map((item) => (
                            <LeftMenuTabItem icon={item.icon} active={item.container === ActiveContainer}
                                             onMenuItemClick={() => this.onLeftMenuClick(item.container)}
                                             activeIcon={item.activeIcon} label={item.label} key={item.container} />
                        ))
                    }
                </div>
            </div>
        );
    }
}


export const LeftMenuStoreState = (state: StoreStatesTypes): LeftMenuInheritStoreStates => ({
    Containers: state.System.Containers,
    ActiveContainer: state.System.active,
    CurrentUserAvatar: state.System.CurrentUser.avatar
});
export const LeftMenuStoreAction = (dispatch: StoreDispatchHandle): LeftMenuUseStoreActions => ({
    UpdateActiveContainer: (containerId: TabContainers) => UpdateActiveContainer(dispatch, { containerId })
});

export default connect(LeftMenuStoreState, LeftMenuStoreAction)(LeftMenu);
