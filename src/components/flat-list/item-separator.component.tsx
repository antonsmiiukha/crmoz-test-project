import React from 'react';
import {View} from 'react-native';
import {useTailWind} from '../../hook/tailwind.hook.ts';

export const ItemSeparatorComponent: React.FC = () => {
  const {tw} = useTailWind();

  return <View style={tw`h-2`} />;
};
