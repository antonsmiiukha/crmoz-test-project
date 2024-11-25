import {RouteProp} from '@react-navigation/native';

export enum EPrimaryNavigationList {
  Home = 'home',
  User = 'user',
}

export type PrimaryNavigationList = {
  [EPrimaryNavigationList.Home]: undefined;
  [EPrimaryNavigationList.User]: {
    userId: number;
  };
};

export type PrimaryNavigationStackProps<T extends keyof PrimaryNavigationList> =
  {
    route: RouteProp<PrimaryNavigationList, T>;
  };
