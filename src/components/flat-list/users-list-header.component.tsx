import React from 'react';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {TextComponent} from '../text/text.component.tsx';

export const UsersListHeaderComponent: React.FC = () => {
  const {tw} = useTailWind();

  return <TextComponent style={tw`text-xl font-bold`}>Users list</TextComponent>;
};
