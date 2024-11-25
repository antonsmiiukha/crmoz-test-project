import {ERequestContentType, ERequestMethod, IApiRoute} from '../api.type';

export const usersCollectionRequest: IApiRoute = {
  route: 'users',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
