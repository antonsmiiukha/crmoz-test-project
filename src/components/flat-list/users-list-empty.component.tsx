import React from 'react';
import {TextComponent} from '../text/text.component.tsx';
import {View} from 'react-native';
import {useTailWind} from '../../hook/tailwind.hook.ts';

export const UsersListEmptyComponent: React.FC = () => {
  const {tw} = useTailWind();
  return (
    <View style={tw`flex flex-row justify-center w-full`}>
      <TextComponent>List Empty</TextComponent>
    </View>
  );
};
