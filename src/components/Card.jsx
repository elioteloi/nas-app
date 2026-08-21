import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from './Button';
import BottomSheet from './BottomSheet';
import ButtonModal from './ButtonModal';
import Input from './Input';
import folderIcon from '../../assets/images/folder.png';
import folderApi from '../api/folderApi';

const Card = ({
  navigationPage,
  paramsNavigation,
  titleBottomSheet,
  iconBottomSheet,
  onPressUpdate,
  onChangeText,
  value,
  onPressDelete,
  iconButtonBottomSheet,
  children,
  imageCard,
  titleCard,
}) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const {fetchFolder, updateFolder, deleteFolder} = folderApi();

  return (
    <>
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate(navigationPage, {params: paramsNavigation})
        }>
        <View style={styles.optionButton}>
          <BottomSheet
            title={titleBottomSheet}
            iconBottomSheet={imageCard}
            iconButtonBottomSheet={iconButtonBottomSheet}>
            {children}
          </BottomSheet>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={imageCard} style={styles.image} />
        </View>
      </Pressable>
      <Text style={styles.text}>{titleCard}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 190,
    margin: '1%',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },

  optionButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  image: {
    width: 60,
    height: 60,
  },

  text: {
    color: 'black',
  },
  buttonContainer: {
    padding: 8,
  },

  button: {
    width: 25,
    height: 25,
  },
});

export default Card;
