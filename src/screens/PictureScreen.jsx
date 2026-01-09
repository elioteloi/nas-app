import React, { useContext, useEffect, useState } from "react";
import { View, Image, ScrollView, Platform, Alert, Linking, Text, FlatList, Switch } from "react-native";
import RNFS from 'react-native-fs';
import mime from 'react-native-mime-types';
import syncApi from "../api/syncApi";
import AuthContext from "../context/AuthContext";
import Config from "react-native-config";


const PictureScreen = () => {

  const { id, name } = useContext(AuthContext)


  const { createSync, fetchOriginalFiles, fetchResizedFiles } = syncApi()

  const [originalFiles, setOriginalFiles] = useState([]);
  const [resizedFiles,  setResizedFiles] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true)



  useEffect(() => {
    async function fetchFileFunc() {

      // const path = RNFS.ExternalStorageDirectoryPath + "/DCIM/Screenshots";

    const path = RNFS.ExternalStorageDirectoryPath + "/Download/video";
        // const path = RNFS.ExternalStorageDirectoryPath + "/DCIM/Camera";

    const files = await RNFS.readDir(path);
    let dataResizedFile = await fetchResizedFiles(id)
    let dataOriginalFiles = await fetchOriginalFiles(id);
    console.log("imagess ", files);
    
      setResizedFiles(dataResizedFile.result)
      setOriginalFiles(dataOriginalFiles.result);      
      
        for (let index = 0; index < files.length; index++) {
          itsThere = false;
          const mimeType = mime.lookup(files[index].name.toLowerCase());

          
          for (let j = 0; j < dataOriginalFiles.result.length; j++) {
            if (dataOriginalFiles.result[j].filename === files[index].name) {
              itsThere = true;
              break;
            }
          }
          if (itsThere) {
                        console.log("match ", files[index].path, mimeType);

          } else {
            console.log("no match ", files[index].name, mimeType );
            try {

                const formData = new FormData();
              formData.append("sync", {
                uri: 'file://' + files[index].path,
                type: mimeType,
                name:files[index].name,
              });
              formData.append("ID", id);
              formData.append("NAME", name)

              try {
                const response = await createSync(formData);
                console.log("Message from backend:", response);
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
        data={resizedFiles}
        keyExtractor={item => item.id}
        numColumns={4}
     
         renderItem={({ item }) => (<View>
          <Image
            key={item.id}
            source={{ uri: `http://${Config.API_IP_ADDRESS}:${Config.PORT}/path_Of_Drive/${item.userdrive}/sync/resized_files/${item.resized_filename}` }}
            style={{ width: 110, height: 110}}

          />
        </View>)}

      />

    </View>
  );
};

export default PictureScreen;