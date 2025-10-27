import React, { useContext, useEffect, useState } from "react";
import { View, Image, ScrollView, Platform, Alert, Linking, Text, FlatList, Switch } from "react-native";
import RNFS from 'react-native-fs';
import syncApi from "../api/syncApi";
import AuthContext from "../context/AuthContext";
import Config from "react-native-config";

const PictureScreen = () => {

  const { id, name } = useContext(AuthContext)


  const { fetchSync } = syncApi()

  const [photos, setPhotos] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true)



  useEffect(() => {
    let ws

    async function fetchFileFunc() {
      // const path = RNFS.ExternalStorageDirectoryPath + "/DCIM/Screenshots";

    const path = RNFS.ExternalStorageDirectoryPath + "/Test";
    const files = await RNFS.readDir(path);
    
    let data = await fetchSync(id);
      setPhotos(data.result);      
      
      const ws = new WebSocket(`ws://100.91.102.83:8080`);
      console.log("Websocket connection opened");
      
      ws.onopen = async () => {
        for (let index = 0; index < files.length; index++) {
      itsThere = false;
      for (let j = 0; j < photos.length; j++) {
        
        if (data.result[j].name === files[index].name) {
          console.log("name ", data.result[index].name);
          itsThere = true;
          break;
        }
      }
      if (itsThere) {
        console.log("match");
      } else {
        try {
          const base64Data = await RNFS.readFile(files[index].path, 'base64');          

          ws.send(
            JSON.stringify({
              id: id,
              name: name,
              type: "file",
              filename: files[index].name,
              data: base64Data,
            })
          );
        } catch (error) {
          console.error('Error reading fileyee:', error);
        }
      }
    }
    ws.onmessage = (e) => {
      console.log("message from server: ", e.data);
    };

    ws.onerror = (e) => {
      console.log("websocket error: ", e.message);
    };

    ws.onclose = (e) => {
      console.log("Websocket econnection closed: ", e.code, e.reason);
    };
  }
    }

    fetchFileFunc()

    return () => {
      ws.close();
    };

  }, [])


  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={4}
        renderItem={({ item }) => (<View>
          <Image
            key={item.id}
            source={{ uri: `http://${Config.API_IP_ADDRESS}:${Config.PORT}/path_Of_Drive/${item.userdrive}/sync/${item.filename}` }}
            style={{ width: 100, height: 100 }}

          />
        </View>)}
      />

    </View>
  );
};

export default PictureScreen;