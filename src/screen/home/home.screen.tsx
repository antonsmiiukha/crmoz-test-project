import React from 'react';
import {
  EPrimaryNavigationList,
  PrimaryNavigationStackProps,
} from '../../navigation/primary-navigation.type.ts';
import {useApi} from '../../hook/api.hook.ts';
import {ERequestName} from '../../api/api.ts';
import {IRequest} from '../../api/api.type.ts';
import {HomeComponent} from '../../components/home/home.component.tsx';
import {IUsersCollection} from '../../api/users-collection/users-collection.type.ts';
import {LoadingComponent} from '../../components/loading/loading.component.tsx';

export const HomeScreen: React.FC<
  PrimaryNavigationStackProps<EPrimaryNavigationList.Home>
> = () => {
  const {
    data: usersCollection,
    code: usersResponseCode,
    loading: usersResponseLoading,
  } = useApi<IRequest, IUsersCollection>(ERequestName.UsersCollection);

  if (usersResponseCode !== 200 || usersResponseLoading) {
    return <LoadingComponent />;
  }

  return <HomeComponent usersCollection={usersCollection} />;
};
