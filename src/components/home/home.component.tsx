import React, {useCallback} from 'react';
import {IUsersCollection} from '../../api/users-collection/users-collection.type.ts';
import {FlatList, View} from 'react-native';
import {IUser} from '../../api/user/user.type.ts';
import {UserListItemComponent} from './user-list-item.component.tsx';
import {ItemSeparatorComponent} from '../flat-list/item-separator.component.tsx';
import type {ListRenderItem} from '@react-native/virtualized-lists';
import {ScreenComponent} from '../screen/screen.component.tsx';
import {UsersListHeaderComponent} from '../flat-list/users-list-header.component.tsx';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {UsersListEmptyComponent} from '../flat-list/users-list-empty.component.tsx';

interface HomeComponentProps {
  usersCollection: IUsersCollection | undefined;
}

export const HomeComponent: React.FC<HomeComponentProps> = ({
  usersCollection = [],
}) => {
  const {tw} = useTailWind();

  const renderItem = useCallback<ListRenderItem<IUser>>(({item: user}) => {
    return <UserListItemComponent user={user} />;
  }, []);

  return (
    <ScreenComponent>
      <View style={tw`flex flex-col gap-4`}>
        <FlatList<IUser>
          style={tw`h-full`}
          ListHeaderComponent={UsersListHeaderComponent}
          data={usersCollection}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={UsersListEmptyComponent}
        />
      </View>
    </ScreenComponent>
  );
};
