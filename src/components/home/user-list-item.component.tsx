import {IUser} from '../../api/user/user.type.ts';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  EPrimaryNavigationList,
  PrimaryNavigationList,
} from '../../navigation/primary-navigation.type.ts';
import {TextComponent} from '../text/text.component.tsx';

interface UserComponentProps {
  user: IUser;
}

export const UserListItemComponent: React.FC<UserComponentProps> = ({
  user: user,
}) => {
  const {tw} = useTailWind();
  const navigation = useNavigation<NavigationProp<PrimaryNavigationList>>();

  const onPressUserItemHandler = useCallback(() => {
    navigation.navigate(EPrimaryNavigationList.User, {userId: user.id});
  }, [user, navigation]);

  return (
    <TouchableOpacity
      style={tw`flex flex-col`}
      activeOpacity={0.6}
      onPress={onPressUserItemHandler}>
      <TextComponent>Name: {user.name}</TextComponent>
      <TextComponent>Email: {user.email}</TextComponent>
      <TextComponent>Phone: {user.phone}</TextComponent>
    </TouchableOpacity>
  );
};
