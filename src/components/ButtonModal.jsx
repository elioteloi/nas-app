import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Button from './Button';

const ButtonModal = ({children, title, titleBtnModal, textAlert, onPress}) => {
  const [modalFolderVisible, setModalFolderVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFolderVisible}
        onRequestClose={() => {
          setModalFolderVisible(!modalFolderVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>{children}</View>
            <Text style={{color: 'black'}}>{textAlert}</Text>
            <Button
              title={titleBtnModal}
              onPress={async () => {
                onPress();
                setModalFolderVisible(!modalFolderVisible);
              }}
              backgroundColor="#0099ff"
            />
            <Button
              title="close"
              onPress={() => setModalFolderVisible(!modalFolderVisible)}
              backgroundColor="#CD5C5C"
            />
          </View>
        </View>
      </Modal>

      <Button
        title={title}
        onPress={() => setModalFolderVisible(true)}
        backgroundColor="#0099ff"
      />
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default ButtonModal;
