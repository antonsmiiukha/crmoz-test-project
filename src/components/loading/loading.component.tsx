import React from 'react';
import {ScreenComponent} from '../screen/screen.component.tsx';
import {ActivityIndicator, View} from 'react-native';
import {useTailWind} from '../../hook/tailwind.hook.ts';

export const LoadingComponent: React.FC = () => {
  const {tw} = useTailWind();

  return (
    <ScreenComponent>
      <View style={tw`flex justify-center items-center h-full`}>
        <ActivityIndicator />
      </View>
    </ScreenComponent>
  );
};
