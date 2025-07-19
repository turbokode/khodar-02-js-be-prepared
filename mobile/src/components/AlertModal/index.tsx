import { OctagonAlert, SendHorizontal } from 'lucide-react-native';
import { Modal, TouchableOpacity, View, TextInput, Text } from 'react-native';
import { styles } from './styles';

interface AlertModalProps {
  onCloseModal: () => void;
  modalOpen: boolean;
  alertMessage: string;
}

export function AlertModal({ onCloseModal, modalOpen, alertMessage }: AlertModalProps) {
  function handleCloseModal() {
    onCloseModal();
  }
  return (
    <Modal transparent visible={modalOpen} animationType="fade">
      <TouchableOpacity activeOpacity={0.9} style={styles.modalContainer} onPress={handleCloseModal}>
        <TouchableOpacity activeOpacity={1} style={{ width: '100%' }}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <OctagonAlert color="#DB2B51" size={45} />
              <Text style={styles.modalTitle}>Alerta de emergência</Text>
            </View>
            <Text style={styles.modalText}>{alertMessage}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
