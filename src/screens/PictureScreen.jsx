import React, { useContext, useEffect, useState } from "react";
import { View, Image, ScrollView, Platform, Alert, Linking, Text, FlatList, Switch } from "react-native";
import RNFS from 'react-native-fs';
import syncApi from "../api/syncApi";
import AuthContext from "../context/AuthContext";
import Config from "react-native-config";


const PictureScreen = () => {

  const { id, name } = useContext(AuthContext)


  const { createSync, fetchSync } = syncApi()

  const [photos, setPhotos] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true)



  useEffect(() => {
    async function fetchFileFunc() {

      // const path = RNFS.ExternalStorageDirectoryPath + "/DCIM/Screenshots";

    const path = RNFS.ExternalStorageDirectoryPath + "/Test";
        // const path = RNFS.ExternalStorageDirectoryPath + "/DCIM/Camera";

    const files = await RNFS.readDir(path);
    
    let data = await fetchSync(id);
    
      setPhotos(data.result);      
      
        for (let index = 0; index < files.length; index++) {
          itsThere = false;
          for (let j = 0; j < data.result.length; j++) {
              
            if (data.result[j].filename === files[index].name) {
              console.log("name ", data.result[j].filename);
              itsThere = true;
              break;
            }
          }
          if (itsThere) {
            console.log("match");
          } else {
            console.log("no match");

            try {
                
                const formData = new FormData();
              formData.append("sync", {
                uri: 'file://' + files[index].path,
                type: "image/png",
                name:files[index].name,
              });
              formData.append("ID", id);
              formData.append("NAME", name)

              try {
                const response = await createSync(formData);
                console.log("Message from backend:", response.message);
              } catch (error) {
                console.error("Upload failed:", error);
              }      
                  
            } catch (error) {
              console.error('Error reading file:', error);
            }
          }
  }
    }

    fetchFileFunc()
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