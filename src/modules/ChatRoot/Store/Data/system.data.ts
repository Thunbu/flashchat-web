import * as ChatMenu from "../../../../assets/images/index/chat.svg";
import * as ActiveChatMenu from "../../../../assets/images/index/chat.active.svg";
import * as CloudMenu from "../../../../assets/images/index/cloud.svg";
import * as CloudActiveMenu from "../../../../assets/images/index/cloud.active.svg";
import {MenuDataItem, SystemStoreTypes} from "../Types/system.t";
import {DefaultAvatarList} from "../../dafault.data";

export const Containers: MenuDataItem[] = [
    {
        icon: ChatMenu,
        activeIcon: ActiveChatMenu,
        label: '会话',
        container: 'chat_main',
    },
    {
        icon: CloudMenu,
        activeIcon: CloudActiveMenu,
        label: '云盘',
        container: 'disk_cloud',
    }
]

export const SystemStoreData: SystemStoreTypes = {
    active: 'chat_main',
    Containers,
    CurrentUser: {
        avatar: localStorage.getItem('USERAVATAR') || DefaultAvatarList[6],
        name: localStorage.getItem('USERNAME') || '',
        IMID: localStorage.getItem('USERIMID') || '',
        sig: localStorage.getItem('USERSIG') || '',
        userId: localStorage.getItem('USERID') || '',
    }
}
