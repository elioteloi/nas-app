import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import Button from "../components/Button";
import fileApi from "../api/fileApi";
import AuthContext from "../context/AuthContext";
import FileList from "../components/FileList";
import {launchImageLibrary} from 'react-native-image-picker';
import Loading from "../components/Loading";

const FolderScreen = ({ route }) => {

  const {id} = useContext(AuthContext)

  const [data, setData] = useState([])
  const [errorBackend, setErrorBackend] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {createFile, fetchFile, updateFile, deleteFile} = fileApi()


  const {folder} = route.params

  const fetchFileHandler = async () => {
    try {
     
      const json = await fetchFile(id, folder);
      setData(json.result)
      
    } catch (error) {
      console.error('Error in fetchID');
    }
  };


  useEffect(() => {
    
    fetchFileHandler();
  }, [folder]);


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
      formData.append("photos", {
        uri: element.uri,
        type: element.type,
        name: element.fileName,
      });
      formData.append("ID", id);
      formData.append("folder", folder);

      await createFile(formData);
    }
  } catch (err) {
    console.error("Upload error:", err);
  }
};




  return (
        <View>
          <Button
              title="Import your files"
              onPress={async () => {

                setIsLoading(true)
                await uploadFilesOnPressHandler()
                
                await fetchFileHandler()
                setIsLoading(false)

              }}
              backgroundColor="#0099ff"
            />
          {errorBackend ? <TextError>{errorBackend}</TextError> : null}
          {isLoading ? (<Loading/>) : (<FileList data={data} folder={folder}/>)}

        </View>
  )
}



export default FolderScreen;