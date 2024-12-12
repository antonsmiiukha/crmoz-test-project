import {IRequest, IResponse} from '../api.type.ts';

export interface IGeo {
  lat: number;
  lng: number;
}

export interface IGeoResponse {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IAddressResponse {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoResponse;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUserResponse extends IResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddressResponse;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IUser extends IResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IUserRequest extends IRequest {
  userId: number;
}
