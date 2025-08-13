import React from "react";
import Config from "react-native-config";
import { StyleSheet, Image, View } from 'react-native';

const FileScreen = ({ route }) => {

    const {userdrive, folder, filename} = route.params
    
    return (
        <View>
            <Image 
              source={{ uri: `http://${Config.API_IP_ADDRESS}:3000/path_Of_Drive/${userdrive}/${folder}/${filename}`}}
              style={styles.picture} 
              resizeMode="contain" 
              />
        </View>
    )
}

const styles = StyleSheet.create({
    picture: {
      width: "100%",
      height: "100%"
    },
  });
  


export default FileScreen