import React from "react";
import { FlatList, View } from "react-native";
import ButtonModalInput from "./ButtonModalInput";
import fileApi from "../api/fileApi";
import ButtonModal from "./ButtonModal";
import File from "./File";

const FileList = ({ data, folder }) => {

  const {updateFile, deleteFile} = fileApi()


  const handleUpdate = (changeId, changeText) => {
    updateFile(changeId, changeText);
  }

  const handleDelete = (id) => {
    deleteFile(id)
  }
    return (
      <>

        <FlatList
                  numColumns={3}
                  keyExtractor={item => item.filename}
                  nestedScrollEnabled={true}
                  data={data}
                  
                  renderItem={({item}) => (
                    <View key={item.filename} style={{ padding: 5 }}>
                      <File item={item} folder={folder}/>

                      <ButtonModalInput title="update" placeholder="change the name of the file" id={item.id} titleBtnModal="update" triggerFunction={handleUpdate}/>
                      <ButtonModal title="delete" textAlert="Are you sure that you want to delete the file !" titleBtnModal="delete" id={item.id} triggerFunction={handleDelete}/>

                    </View>
                  )}
                  
                  />
      </>
    )
}

export default FileList