import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  EPrimaryNavigationList,
  PrimaryNavigationList,
} from './primary-navigation.type';
import {HomeScreen} from '../screen/home/home.screen.tsx';
import {UserScreen} from '../screen/user/user.screen.tsx';

export const PrimaryNavigation: React.FC = () => {
  const Stack = createNativeStackNavigator<PrimaryNavigationList>();

  const screenOptions = useMemo(() => {
    return {
      headerShown: false,
      gestureEnabled: true,
    };
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={EPrimaryNavigationList.Home}
          screenOptions={screenOptions}>
          <Stack.Screen
            name={EPrimaryNavigationList.Home}
            component={HomeScreen}
          />
          <Stack.Screen
            name={EPrimaryNavigationList.User}
            component={UserScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
