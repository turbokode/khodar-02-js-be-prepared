import React, { useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { AppStack } from './src/routes/AppStack';
import { AuthProvider } from './src/contexts/auth';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';
import { AlertModal } from './src/components/AlertModal';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_700Bold
  });
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF'
    }
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(handleNotification);
    const unsubscribe = messaging().onMessage(handleNotification);
    return unsubscribe;
  }, []);

  if (!loaded && !error) {
    return null;
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    setModalOpen(true);
    setAlertMessage(remoteMessage.notification?.body + '');
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeArea}>
          <AppStack />
        </SafeAreaView>
      </NavigationContainer>
      <AlertModal onCloseModal={closeModal} modalOpen={modalOpen} alertMessage={alertMessage} />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 32,
    paddingHorizontal: 32
  }
});

AppRegistry.registerComponent('app', () => App);
