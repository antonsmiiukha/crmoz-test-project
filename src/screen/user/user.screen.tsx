import React, {useMemo} from 'react';
import {
  EPrimaryNavigationList,
  PrimaryNavigationStackProps,
} from '../../navigation/primary-navigation.type.ts';
import {UserComponent} from '../../components/user/user.component.tsx';
import {useApi} from '../../hook/api.hook.ts';
import {IUser, IUserRequest} from '../../api/user/user.type.ts';
import {ERequestName} from '../../api/api.ts';
import {LoadingComponent} from '../../components/loading/loading.component.tsx';

export const UserScreen: React.FC<
  PrimaryNavigationStackProps<EPrimaryNavigationList.User>
> = ({
  route: {
    params: {userId},
  },
}) => {
  const userRequest = useMemo<IUserRequest>(() => {
    return {
      userId: userId,
    };
  }, [userId]);

  const {
    data: user,
    loading: userLoading,
    code: userResponseCode,
  } = useApi<IUserRequest, IUser>(ERequestName.User, userRequest);

  if (!user || userResponseCode !== 200 || userLoading) {
    return <LoadingComponent />;
  }

  return <UserComponent user={user} />;
};
