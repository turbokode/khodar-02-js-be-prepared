import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Otp } from '../screens/Otp';
import { Login } from '../screens/Login';
import { HomeDrawer } from './HomeDrawer';
import { useAuth } from '../contexts/auth';

export type StackParamList = {
  Login: undefined;
  Otp: { phone: string };
  HomeDrawer: undefined;
};

export function AppStack() {
  const { loggedIn } = useAuth();
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ? (
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Otp" component={Otp} />
        </>
      )}
    </Stack.Navigator>
  );
}
