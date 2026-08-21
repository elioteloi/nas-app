import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View} from 'react-native';
import Button from '../components/Button';
import fileApi from '../api/fileApi';
import AuthContext from '../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import Loading from '../components/Loading';
import Card from '../components/Card';
import more from '../../assets/images/more.png';
import ButtonModal from '../components/ButtonModal';
import Input from '../components/Input';

const FolderScreen = ({route}) => {
  const {id, url} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [errorBackend, setErrorBackend] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changeText, setChangeText] = useState('');

  const {createFile, fetchFile, updateFile, deleteFile} = fileApi();

  const {params} = route.params;

  const file = async id => {
    const json = await fetchFile(id, params);
    setData(json.result);
  };

  useEffect(() => {
    file(id);
  }, [id]);

  const uploadFilesOnPressHandler = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 0,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await launchImageLibrary(options);

      if (response.didCancel) {
        console.log('User cancelled image picker');

        return;
      }
      if (response.errorCode) {
        console.log('Image picker error:', response.errorMessage);
        return;
      }

      for (const element of response.assets) {
        const formData = new FormData();
        formData.append('photos', {
          uri: element.uri,
          type: element.type,
          name: element.fileName,
        });
        formData.append('ID', id);
        formData.append('folder', params);
        await createFile(formData);
        await file(id);
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <View>
      <Button
        title="Import your files"
        onPress={async () => {
          setIsLoading(true);
          await uploadFilesOnPressHandler();

          setIsLoading(false);
        }}
        backgroundColor="#0099ff"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Card
              navigationPage={'File'}
              paramsNavigation={[
                item.userdrive,
                item.foldername,
                item.filename,
                item.originalname,
              ]}
              titleBottomSheet={item.originalname}
              iconButtonBottomSheet={more}
              iconBottomSheet={{
                uri: `${url}/path_Of_Drive/${item.userdrive}/${item.foldername}/${item.filename}`,
              }}
              onChangeText={setChangeText}
              value={changeText}
              imageCard={{
                uri: `${url}/path_Of_Drive/${item.userdrive}/${item.foldername}/${item.filename}`,
              }}
              titleCard={item.originalname}>
              <ButtonModal
                title="Update"
                titleBtnModal="Update folder"
                onPress={async () => {
                  setIsLoading(true);
                  await updateFile(item.id, changeText);
                  await file(id);
                  setIsLoading(false);
                }}>
                <Input
                  placeholder="Change the name for the file"
                  onChangeText={setChangeText}
                  value={changeText}
                />
              </ButtonModal>

              <ButtonModal
                title="Delete"
                textAlert="Are you sure that you want to delete the file !"
                titleBtnModal="Delete file"
                onPress={async () => {
                  setIsLoading(true);
                  await deleteFile(item.id);
                  await file(id);
                  setIsLoading(false);
                }}
              />
            </Card>
          </View>
        )}
      />
    </View>
  );
};

export default FolderScreen;
