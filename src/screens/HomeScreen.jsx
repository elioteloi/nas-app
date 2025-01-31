import Button from "../components/Button";
import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image, RefreshControl} from 'react-native';

import folderApi from "../api/folderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotConnected from "../components/NotConnected";
import FolderList from "../components/FolderList";
import AuthContext from "../context/AuthContext";
import ButtonModalInput from "../components/ButtonModalInput";

const HomeScreen = () => {
  
  const {id} = useContext(AuthContext)

  const [data, setData] = useState([])
  const [noWifi, setNoWifi] = useState(true)
  const { createFolder, fetchFolder, updateFolder, deleteFolder } = folderApi()

  useEffect(() => {
    const fetchFolderHandler = async () => {
      try {

        const values = await AsyncStorage.getItem('storage')
        
        if (!values) {
          console.error('No data found in storage');
          return;
        }
        
        const users = JSON.parse(values);
  
        const json = await fetchFolder(users.id);
        setNoWifi(false)
        setData(json.result);          
        console.log("json home", json);

      } catch (error) {
        console.error('Error in fetchFolderHandler');
      }
      

    }
    
    fetchFolderHandler()
  }, [])

  const handleCreate = (id, changeText) => {
    createFolder(id, changeText)

  }

  return (
    <>{noWifi ? (  
      <NotConnected />)
        :
        (
          <>
            <ButtonModalInput title="create folder" placeholder="create a name for the folder" titleBtnModal="create" id={id} triggerFunction={handleCreate}/>
            <FolderList data={data}/>
          </>
        )
      }
    </>
   
  )
}

export default HomeScreen




