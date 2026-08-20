import react, {createContext, useContext, useState} from 'react';
import {View} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import urlApi from '../api/urlApi';
import TextError from '../components/TextError';
import AuthContainer from '../components/AuthContainer';
import AuthContext from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServerUrlScreen = () => {
  const navigation = useNavigation();

  const {serverUrl} = useContext(AuthContext);

  const [serverIp, SetServerIp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {fetchUrl} = urlApi();

  const health = async () => {
    const json = await fetchUrl(serverIp);

    if (serverIp.startsWith('http://')) {
      if (json.status) {
        await serverUrl(serverIp);
        navigation.navigate('login');
        setErrorMessage('');
      } else {
        setErrorMessage('server is not reachable');
        console.log('server is not reachable');
      }
      // navigation.navigate('login');
    } else {
      setErrorMessage('Invalid URL');
      console.log('Invalid URL');
    }
  };

  return (
    <>
      <AuthContainer>
        <Input
          placeholder="http://your-server-ip:port"
          onChangeText={SetServerIp}
          value={serverIp}
        />
        {errorMessage ? <TextError errorMessage={errorMessage} /> : null}

        <Button
          title="Next"
          onPress={async () => {
            //   await Login();
            //   setIsLoading(false);

            await health();
          }}
          backgroundColor="#0099ff"
        />
      </AuthContainer>
    </>
  );
};

export default ServerUrlScreen;
