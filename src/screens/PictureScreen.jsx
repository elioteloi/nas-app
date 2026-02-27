import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";

import { View, Image, ScrollView, Platform, Alert, Linking, Text, FlatList, Switch } from "react-native";
import RNFS from 'react-native-fs';
import mime from 'react-native-mime-types';
import syncApi from "../api/syncApi";
import AuthContext from "../context/AuthContext";
import Config from "react-native-config";

import { NativeModules, PermissionsAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { MediaStoreModule } = NativeModules;

const PictureScreen = () => {

  const { id, name } = useContext(AuthContext)


  const { createSync, fetchOriginalFiles, fetchResizedFiles } = syncApi()

  const [originalFiles, setOriginalFiles] = useState([]);
  const [resizedFiles,  setResizedFiles] = useState([]);
  const [asyncStorage, setAsyncStorage] = useState()

    async function fetchFileFunc() {

      let dataResizedFile = await fetchResizedFiles(id)
      let dataOriginalFiles = await fetchOriginalFiles(id);

        setResizedFiles(dataResizedFile.result)
        setOriginalFiles(dataOriginalFiles.result);  
      
      const values = await AsyncStorage.getItem('folderSync')
      const sync = JSON.parse(values);

      setAsyncStorage(sync)

      for (let index = 0; index < sync.length; index++) {
        if (sync[index].boolean === true) {
          let folder = sync[index].name

      const files = await MediaStoreModule.getImagesByFolder(sync[index].id);      
        
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
              console.log("match ", files[index].name, mimeType);
              
            } else {
              console.log("no match ", files[index].name, files[index].mimeType, files[index].uri );

              try {

                const formData = new FormData();
                formData.append("sync", {
                  uri: files[index].uri,
                  type: files[index].mimeType,
                  name:files[index].name,
                });
                formData.append("ID", id);
                formData.append("NAME", name)
                formData.append("FOLDER", folder)

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
        
        
  } 
    
  };
  
  
  async function filterEle(folderName) {    

    if (folderName == "All") {
      let dataResizedFile = await fetchResizedFiles(id)
    
      setResizedFiles(dataResizedFile.result)
      
    } else {
      let dataResizedFile = await fetchResizedFiles(id)
    
    setResizedFiles(dataResizedFile.result)
    
    setResizedFiles(dataResizedFile.result.filter((el) => el.folderSync === folderName))
    }

  }

  useEffect(() => {   
    
    fetchFileFunc()
  }, [])

  return (
    <View>
       <Button
      backgroundColor="#0099ff"
      title="All"
     
      onPress={() => {filterEle("All")}
      }
    >
      <Text style={{ color: "white" }}>
        {"All"}
      </Text>
    </Button>
<FlatList 
  data={asyncStorage}
  keyExtractor={item => item.id}
  numColumns={5}
  columnWrapperStyle={{ justifyContent: "space-between" }}
  renderItem={({ item }) => (
    <Button
    backgroundColor="#0099ff"
    title={item.name}
     
      onPress={() => {filterEle(item.name)}
      }
    >
      <Text style={{ color: "white" }}>
        {item.name}
      </Text>
    </Button>
  )}
/>
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