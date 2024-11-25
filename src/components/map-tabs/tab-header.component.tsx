import React from 'react';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {Route, TabBar} from 'react-native-tab-view';
import type {
  NavigationState,
  SceneRendererProps,
  TabDescriptor,
} from 'react-native-tab-view';

export const TabHeaderComponent: <T extends Route>(
  props: SceneRendererProps & {
    navigationState: NavigationState<T>;
    options: Record<string, TabDescriptor<T>> | undefined;
  },
) => React.ReactNode = props => {
  const {tw} = useTailWind();

  return (
    <TabBar
      {...props}
      indicatorStyle={tw`bg-base-2`}
      labelStyle={tw`bg-base-2`}
      style={tw`bg-base-1`}
    />
  );
};
