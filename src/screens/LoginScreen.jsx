import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../context/AuthContext';

import userApi from '../api/userApi';

import AuthContainer from '../components/AuthContainer';
import Title from '../components/Title';
import Input from '../components/Input';
import TextError from '../components/TextError';
import Button from '../components/Button';
import Loading from '../components/Loading';
import {NativeModules, PermissionsAndroid} from 'react-native';

const {MediaStoreModule} = NativeModules;

const LoginScreen = () => {
  const {fetchUser} = userApi();
  const {login, folderSync} = useContext(AuthContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [errorBackend, setErrorBackend] = useState('');

  const requestPermissionAndLogFiles = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
        return;
      }

      console.log('Storage permission granted');

      const folders = await MediaStoreModule.getImageFolders();

      let asyncArray = [];

      for (let index = 0; index < folders.length; index++) {
        const syncObj = {
          id: folders[index].id,
          name: folders[index].name,
          boolean: true,
          lastImage: folders[index].lastImage,
        };
        asyncArray.push(syncObj);
      }
      folderSync(asyncArray);

      console.log('folder synced');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestPermissionAndLogFiles();
  });

  const Login = async () => {
    const json = await fetchUser(email, password);

    if (json.success) {
      login(json);
      setIsLoading(true);
    } else if (json.errorInput) {
      console.log(json.errorInput);
      setErrorMessage(json.errorInput);
    } else if (json.errorEmail) {
      console.log(json.errorEmail);
      setErrorMessage(json.errorEmail);
    } else if (json.errorPassword) {
      console.log('json error password: ', json.errorPassword);
      setErrorMessage(json.errorPassword);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AuthContainer>
            <Title title="Login" />

            <Input placeholder="email" value={email} onChangeText={setEmail} />

            {errorMessage ? <TextError errorMessage={errorMessage} /> : null}
            {errorBackend ? <TextError errorMessage={errorBackend} /> : null}

            <Input
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Button
              title="Login"
              onPress={async () => {
                await Login();
                setIsLoading(false);
              }}
              backgroundColor="#0099ff"
            />

            <Button
              title="Go to signin"
              onPress={() => navigation.navigate('signin')}
              backgroundColor="#0099ff"
            />
          </AuthContainer>
        </>
      )}
    </>
  );
};

export default LoginScreen;
