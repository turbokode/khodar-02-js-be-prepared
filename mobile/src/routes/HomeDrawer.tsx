import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { SentAlerts } from '../screens/SentAlerts';

export function HomeDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        drawerActiveTintColor: '#DB2B51',
        drawerStyle: { width: '65%' },
        headerStatusBarHeight: 12,
        headerLeftContainerStyle: { borderWidth: 1, borderColor: '#000000', borderRadius: 6 }
      }}
      initialRouteName="Minha conta"
    >
      <Drawer.Screen name="Minha conta" component={Profile} />
      <Drawer.Screen name="Alertas" component={Home} />
      <Drawer.Screen name="Alertas enviados" component={SentAlerts} />
    </Drawer.Navigator>
  );
}
