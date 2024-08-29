import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Otp } from '../screens/Otp';
import { Login } from '../screens/Login';
import { HomeDrawer } from './HomeDrawer';

export type StackParamList = {
  Login: undefined;
  Otp: undefined;
  HomeDrawer: undefined;
};

export function AppStack() {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeDrawer">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
    </Stack.Navigator>
  );
}
