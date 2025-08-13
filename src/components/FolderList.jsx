import React, { useContext, useState } from "react";

import folderApi from "../api/folderApi";
import { FlatList, View } from "react-native";
import Folder from "./Folder";
import ButtonModal from "./ButtonModal";
import ButtonContainer from "./ButtonContainer";
import AuthContext from "../context/AuthContext";
import Loading from "./Loading";
import Input from "./Input";

const FolderList = () => {
  const {updateFolder, deleteFolder } = folderApi()
  const [isLoading, setIsLoading] = useState(false)
  const [changeText, setChangeText] = useState('')

  const { data, fetchFolderHandler} = useContext(AuthContext)


    return (
      <>
      {isLoading ? (<Loading/>) : (

      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Folder item={item}/>

          <ButtonContainer>
            <ButtonModal title="Update" titleBtnModal="Update folder" 
              onPress={ async () => {
                setIsLoading(true)
                await updateFolder(item.id, changeText)
                
                await fetchFolderHandler();
                setIsLoading(false)
                
                }}
            >
              <Input placeholder="change the name for the folder" onChangeText={setChangeText} value={changeText} />
            </ButtonModal>

            <ButtonModal title="Delete" textAlert="Are you sure that you want to delete the folder !" titleBtnModal="Delete folder" 
              onPress={ async () => {
                setIsLoading(true)
                await deleteFolder(item.id)
                
              
                await fetchFolderHandler();
                setIsLoading(false)
               
                
              }}
            />
          </ButtonContainer>
          </View>
        )}
      /> 
      )}
      </>


    )
}


export default FolderList