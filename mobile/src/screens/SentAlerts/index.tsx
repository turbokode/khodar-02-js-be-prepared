import { useEffect, useState } from 'react';
import { Bell, MessageCircleWarning, OctagonAlert, SendHorizonal, SendHorizontal } from 'lucide-react-native';
import { Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { AlertListItem } from '../../components/AlertListItem';
import { styles } from './styles';
import { fetchData, postData } from '../../services/api';
import { useAuth } from '../../contexts/auth';

interface NotificationProps {
  id: string;
  subscriberId: string;
  message: string;
  createdAt: Date;
  subscriber: {
    id: string;
    phone: string;
    deviceId: string;
    verified: boolean;
  };
}

export function SentAlerts() {
  const [alerts, setAlerts] = useState<NotificationProps[]>([]);
  const [openAlertItemId, setOpenAlertItemId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { subscriber } = useAuth();

  useEffect(() => {
    fetchAlerts();
  }, []);

  function fetchAlerts() {
    fetchData<NotificationProps[]>(`/notifications/${subscriber?.phone}`).then((alerts) => {
      setAlerts(alerts);
    });
  }

  function handleSetOpenAlertItem(id: string) {
    setOpenAlertItemId(id);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleSendAlert() {
    postData('/notifications', { message }).then((response) => {
      alert('Alerta criado com sucesso');
      handleCloseModal();
      setMessage('');
      fetchAlerts();
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.header}>
          <Bell size={24} color="#000" />
          <Text style={styles.headerTitle}>Alertas enviados</Text>
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
      <TouchableOpacity style={styles.floatingButton} onPress={handleOpenModal}>
        <MessageCircleWarning color="#FFF" size={24} />
      </TouchableOpacity>
      <Modal transparent visible={modalOpen} animationType="fade">
        <TouchableOpacity activeOpacity={0.9} style={styles.modalContainer} onPress={handleCloseModal}>
          <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <OctagonAlert color="#000" />
                <Text style={styles.modalTitle}>Escreva a mensagem</Text>
              </View>
              <View style={styles.modalInputContainer}>
                <TextInput
                  multiline
                  numberOfLines={6}
                  style={styles.modalInput}
                  value={message}
                  onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleSendAlert}>
                  <Text style={styles.modalButtonText}>Enviar</Text>
                  <SendHorizontal color="#DB2B51" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
