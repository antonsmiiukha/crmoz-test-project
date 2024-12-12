import React from 'react';
import {Text} from 'react-native';
import {TextProps} from 'react-native/Libraries/Text/Text';
import {useTailWind} from '../../hook/tailwind.hook.ts';

export const TextComponent: React.FC<TextProps> = props => {
  const {tw} = useTailWind();

  return <Text {...props} style={[tw`text-base-1`, props.style]} />;
};
