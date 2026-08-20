import React, {useState} from 'react';
import {Modal, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Button from './Button';

const BottomSheet = ({
  children,
  title,
  iconBottomSheet,
  iconButtonBottomSheet,
}) => {
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
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalFolderVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.containerTitle}>
              <Image source={iconBottomSheet} style={styles.image} />
              <Text style={styles.title}>{title}</Text>
            </View>
            <View>{children}</View>
            <Button
              title="close"
              onPress={() => setModalFolderVisible(!modalFolderVisible)}
              backgroundColor="#CD5C5C"
            />
          </View>
        </Pressable>
      </Modal>

      <Pressable
        style={styles.buttonContainer}
        onPress={() => setModalFolderVisible(true)}>
        <Image source={iconButtonBottomSheet} style={styles.button} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerTitle: {
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  image: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    padding: 8,
  },

  button: {
    width: 25,
    height: 25,
  },
});
export default BottomSheet;
