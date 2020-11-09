
export interface ChatItemInterface {
    avatar: string,
    name: string,
    time: string,
    id: string,
    type: 0|1, // 0 单聊  1 群聊
}

export interface ChatListStoreTypes {
    list: string[],
    listMap: {
        [key: string]: ChatItemInterface
    },
    active: string,
}


// update list
export const UPDATE_CHAT_LIST = 'UPDATE_CHAT_LIST';

// update active item
export const UPDATE_ACTIVE_CHAT = 'UPDATE_ACTIVE_CHAT';

// Total amount set chat list
export const SET_CHAT_LIST = 'SET_CHAT_LIST';

// update or add chat session to map and list
export const UPDATE_CHAT_ITEM = 'UPDATE_CHAT_ITEM';
