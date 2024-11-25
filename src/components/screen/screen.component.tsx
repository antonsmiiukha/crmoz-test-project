import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleProp, View} from 'react-native';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import {useTailWind} from '../../hook/tailwind.hook.ts';

interface ScreenComponentProps extends PropsWithChildren {
  style?: StyleProp<SafeAreaViewProps>;
}

export const ScreenComponent: React.FC<ScreenComponentProps> = ({children}) => {
  const {tw} = useTailWind();

  return (
    <View style={tw`bg-base-2 h-full w-full`}>
    <SafeAreaView>
      <View style={tw`px-4 py-2`}>{children}</View>
    </SafeAreaView>
    </View>
  );
};
