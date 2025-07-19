import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000030',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    paddingVertical: 64
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 14,
    gap: 32,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalHeader: {
    alignItems: 'center',
    gap: 10
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold'
  },
  modalText: {
    textAlign: 'justify'
  },

  modalButton: {
    backgroundColor: '#DB2B51',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center'
    // maxWidth: 168
  },
  modalButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14
  }
});
