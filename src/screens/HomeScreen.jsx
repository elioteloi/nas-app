import Button from '../components/Button';
import React, {useContext, useEffect, useState} from 'react';

import folderApi from '../api/folderApi';
import NotConnected from '../components/NotConnected';
import AuthContext from '../context/AuthContext';
import Input from '../components/Input';
import Loading from '../components/Loading';
import {FlatList, Text, View} from 'react-native';
import ButtonModal from '../components/ButtonModal';
import ButtonContainer from '../components/ButtonContainer';
import Card from '../components/Card';
import BottomSheet from '../components/BottomSheet';
import plus from '../../assets/images/plus.png';
import more from '../../assets/images/more.png';
import folderImage from '../../assets/images/folder.png';

const HomeScreen = () => {
  const {id, noWifi} = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [changeText, setChangeText] = useState('');

  const {createFolder, fetchFolder, updateFolder, deleteFolder} = folderApi();

  const folder = async id => {
    const json = await fetchFolder(id);
    setData(json.result);
  };

  useEffect(() => {
    folder(id);
  }, [id]);

  return (
    <>
      <>
        <BottomSheet iconButtonBottomSheet={plus} iconBottomSheet={plus}>
          <Input
            onChangeText={setChangeText}
            value={changeText}
            placeholder="Type a name for the folder"
          />
          <Button
            title="Create Folder"
            onPress={async () => {
              setIsLoading(true);
              await createFolder(id, changeText);
              await folder(id);
              setIsLoading(false);
            }}
            backgroundColor="#0099ff"
          />
        </BottomSheet>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Card
                navigationPage={'Folder'}
                paramsNavigation={item.foldername}
                titleBottomSheet={item.foldername}
                iconButtonBottomSheet={more}
                iconBottomSheet={folderImage}
                onPressUpdate={async () => {
                  setIsLoading(true);
                  await updateFolder(item.id, changeText);

                  await folder(id);
                  setIsLoading(false);
                }}
                onPressDelete={async () => {
                  setIsLoading(true);
                  await deleteFolder(item.id);

                  await fetchFolder(item.id);
                  setIsLoading(false);
                }}
                imageCard={folderImage}
                titleCard={item.foldername}
              />
            </View>
          )}
        />
      </>
    </>
  );
};

export default HomeScreen;
