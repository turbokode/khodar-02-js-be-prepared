import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react-native';
import { Text, View, FlatList } from 'react-native';
import { AlertListItem } from '../../components/AlertListItem';
import { styles } from './styles';
import { useAuth } from '../../contexts/auth';
import { fetchData } from '../../services/api';

interface AlertsProps {
  id: string;
  title: string;
  message: string;
  districtId: string;
  provinceId: string;
  createdAt: Date;
  province: {
    id: string;
    designation: string;
  };
  district: {
    id: string;
    designation: string;
  };
}

export function Home() {
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);
  const [openAlertItemId, setOpenAlertItemId] = useState('');

  const { subscriber } = useAuth();

  useEffect(() => {
    fetchData<AlertsProps[]>(`/alerts?provinceId=${subscriber?.provinceId}&districtId=${subscriber?.districtId}`).then(
      (alerts) => {
        setAlerts(alerts);
      }
    );
  }, []);

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
