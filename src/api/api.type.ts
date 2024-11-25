import {ERequestName} from './api';

export enum ERequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ERequestContentType {
  Json = 'application/json',
}

export type IResponse = object;
export type IRequest = object;

export type IApiRoute = {
  route: string;
  method: ERequestMethod;
  contentType: ERequestContentType;
};

export type IApiRoutes = {
  [key in ERequestName]: IApiRoute;
};
