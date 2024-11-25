import {IUser} from '../user/user.type.ts';
import {IResponse} from '../api.type.ts';

export type IUsersCollection = Array<IUser> & IResponse;
