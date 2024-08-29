import { useState } from 'react';
import { Bell } from 'lucide-react-native';
import { Text, View, FlatList } from 'react-native';
import { AlertListItem } from '../../components/AlertListItem';
import { styles } from './styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    message:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quo itaque accusamus deleniti assumenda nulla quas reiciendis ratione voluptas suscipit dolor esse iste, nihil nisi officiis? Unde tempora rerum nobis.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    message:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quo itaque accusamus deleniti assumenda nulla quas reiciendis ratione voluptas suscipit dolor esse iste, nihil nisi officiis? Unde tempora rerum nobis.'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    message:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet quo itaque accusamus deleniti assumenda nulla quas reiciendis ratione voluptas suscipit dolor esse iste, nihil nisi officiis? Unde tempora rerum nobis.'
  }
];

export function Home() {
  const [alerts, setAlerts] = useState(DATA);
  const [openAlertItemId, setOpenAlertItemId] = useState('');

  function handleSetOpenAlertItem(id: string) {
    setOpenAlertItemId(id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bell size={24} color="#000" />
        <Text style={styles.headerTitle}>Alertas</Text>
        <View style={styles.headerCount}>
          <Text style={styles.headerCountText}>3</Text>
        </View>
      </View>
      <FlatList
        data={alerts}
        renderItem={({ item }) => (
          <AlertListItem
					id={item.id}
            message={item.message}
            isOpen={openAlertItemId === item.id}
            onSetOpenItem={handleSetOpenAlertItem}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.alertsList}
      />
    </View>
  );
}
