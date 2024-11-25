import {IApiRoutes} from './api.type';

import {usersCollectionRequest} from './users-collection/users-collection.request.ts';
import {userRequest} from './user/user.request.ts';

export enum ERequestName {
  UsersCollection,
  User,
}

export const apiRoutes: IApiRoutes = {
  [ERequestName.UsersCollection]: usersCollectionRequest,
  [ERequestName.User]: userRequest,
};
