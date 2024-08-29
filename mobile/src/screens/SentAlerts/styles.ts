import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginTop: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#00000040',
    borderRadius: 6,
    gap: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontFamily: 'Inter_700Bold'
  },
  headerCount: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 4
  },
  headerCountText: {
    fontSize: 12
  },
  alertsList: {
    gap: 10
  },
  floatingButton: {
    height: 60,
    width: 60,
    backgroundColor: '#DB2B51',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
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
    padding: 12,
    gap: 12
  },
  modalHeader: {
    flexDirection: 'row',
    gap: 10
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold'
  },
  modalInputContainer: {
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 6,
    padding: 6,
    gap: 12
  },
  modalInput: {
    textAlignVertical: 'top'
  },
  modalButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 6,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalButtonText: {
    color: '#DB2B51',
    fontFamily: 'Inter_700Bold',
    fontSize: 14
  }
});
