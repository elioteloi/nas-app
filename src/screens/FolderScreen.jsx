import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View, TouchableOpacity, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import ButtonPickerFile from "../components/ButtonPickerFile";
import ModalComponent from "../components/Modal";
import Input from "../components/Input";
import fileApi from "../api/fileApi";
import AuthContext from "../context/AuthContext";
import FileList from "../components/FileList";

const FolderScreen = ({ route }) => {

  const {id} = useContext(AuthContext)

  const [data, setData] = useState([])
  const [errorBackend, setErrorBackend] = useState('')

  const {fetchFile, updateFile, deleteFile} = fileApi()


  const {folder} = route.params


  useEffect(() => {
    
    const fetchID = async () => {
      try {
       
        const json = await fetchFile(id, folder);
        setData(json.result)
      } catch (error) {
        console.error('Error in fetchID');
      }
    };
  
    fetchID();
  }, [folder]);

``

  return (
        <View>
          <ButtonPickerFile id={id} folder={folder}/>
          {errorBackend ? <TextError>{errorBackend}</TextError> : null}
          <FileList data={data} folder={folder}/>
        
        </View>
  )

}



export default FolderScreen