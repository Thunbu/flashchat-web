import {MessageLocalInteraction} from "../../Methods/IM/types/_message";
import MessageItemInterface = MessageLocalInteraction.MessageItemInterface;

export interface MessageStoreTypes {
    MessageMap: {
        [key: string]: MessageItemInterface
    },
    ChatMessageList: {
        [key: string]: string[]
    }
}

// Add message to MAP - types
export const ADD_MESSAGE_TO_MAP = 'ADD_MESSAGE_TO_MAP';

// change message state - types (result -1|0|1)
export const UPDATE_MESSAGE_STATE = 'UPDATE_MESSAGE_STATE';

// Add message to session message list
export const ADD_MESSAGE_TO_CHAT = 'ADD_MESSAGE_TO_CHAT';

// Add message list to session message list
export const ADD_MESSAGE_LIST_TO_MAP = 'ADD_MESSAGE_LIST_TO_MAP';

// Add message list to session message list to left
export const ADD_MESSAGE_LIST_TO_CHAT__LEFT_JOIN = 'ADD_MESSAGE_LIST_TO_CHAT__LEFT_JOIN';
