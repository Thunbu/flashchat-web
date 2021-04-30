import { ajax } from "../../../utils";
import {_LoginRequestBaseURL} from "../../../config";

export const GetLoginUserInfo = (userId: string): Promise<any> => {
    return ajax({
        url: `${_LoginRequestBaseURL}/home/userSig`,
        type: 'POST',
        dataType: 'json',
        data: { userId: userId, terminalCode: 1 }
    });
}
