import { useState } from 'react';
import { Bell, MessageCircleWarning, OctagonAlert, SendHorizonal, SendHorizontal } from 'lucide-react-native';
import { Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
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

export function SentAlerts() {
  const [alerts, setAlerts] = useState(DATA);
  const [openAlertItemId, setOpenAlertItemId] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  function handleSetOpenAlertItem(id: string) {
    setOpenAlertItemId(id);
  }

  function handleOpenModal() {
    setModalOpen(true);
  }
  function handleOCloseModal() {
    setModalOpen(false);
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
        <TouchableOpacity activeOpacity={0.9} style={styles.modalContainer} onPress={handleOCloseModal}>
          <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <OctagonAlert color="#000" />
                <Text style={styles.modalTitle}>Escreva a mensagem</Text>
              </View>
              <View style={styles.modalInputContainer}>
                <TextInput multiline numberOfLines={6} style={styles.modalInput} />
                <TouchableOpacity style={styles.modalButton}>
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
