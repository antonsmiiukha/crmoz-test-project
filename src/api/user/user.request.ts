import {ERequestContentType, ERequestMethod, IApiRoute} from '../api.type';

export const userRequest: IApiRoute = {
  route: 'users/{userId}',
  method: ERequestMethod.GET,
  contentType: ERequestContentType.Json,
};
