import React from "react";
import folderApi from "../api/folderApi";
import { FlatList, View } from "react-native";
import Folder from "./Folder";
import ButtonModalInput from "./ButtonModalInput";
import ButtonModal from "./ButtonModal";
import ButtonContainer from "./ButtonContainer";

const FolderList = ({data}) => {

  const { updateFolder, deleteFolder } = folderApi()


  const handleUpdate = (changeId, changeText) => {
    updateFolder(changeId, changeText)
    console.log("update", changeId, changeText);
    
  }

  const handleDelete = (id) => {
    deleteFolder(id)
  }
    return (
      <>

      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({item}) => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Folder item={item}/>

          <ButtonContainer>
            <ButtonModalInput title="Update" placeholder="change the name for the folder" titleBtnModal="update" id={item.id} triggerFunction={handleUpdate}/>
            <ButtonModal title="Delete" textAlert="Are you sure that you want to delete the folder !" titleBtnModal="Delete folder" id={item.id} triggerFunction={handleDelete}/>
          </ButtonContainer>
          </View>
        )}
      />
      </>

    )
}


export default FolderList