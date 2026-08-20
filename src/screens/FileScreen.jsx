import React, {useContext, useEffect} from 'react';
import Config from 'react-native-config';
import {StyleSheet, Image, View} from 'react-native';
import AuthContext from '../context/AuthContext';

const FileScreen = ({route}) => {
  const {url} = useContext(AuthContext);

  const {params} = route.params;

  return (
    <View>
      <Image
        source={{
          uri: `${url}/path_Of_Drive/${params[0]}/${params[1]}/${params[2]}`,
        }}
        style={styles.picture}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: '100%',
    height: '100%',
  },
});

export default FileScreen;
