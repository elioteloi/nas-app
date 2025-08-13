import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import fileApi from "../api/fileApi";
import ButtonModal from "./ButtonModal";
import File from "./File";
import Input from "./Input";
import Loading from "./Loading";
import AuthContext from "../context/AuthContext";

const FileList = ({ folder }) => {

  const {id} = useContext(AuthContext)

  const {fetchFile,updateFile, deleteFile} = fileApi()

  const [data, setData] = useState('')
  const [changeText, setChangeText] = useState('')
  const [isLoading, setIsLoading] = useState(false)


    const fetchFileHandler = async () => {
    try {
     
      const json = await fetchFile(id, folder);
      setData(json.result)
    } catch (error) {
      console.error('Error in fetchID', error);
    }
  };

  useEffect(() => {
      
      fetchFileHandler();
    }, [folder]);
  

    return (
      <>
        {isLoading ? (<Loading/>) : (
          
          <FlatList
          numColumns={3}
          keyExtractor={item => item.filename}
          nestedScrollEnabled={true}
          data={data}
          
          renderItem={({item}) => (
            <View key={item.filename} style={{ padding: 5 }}>
                      <File item={item} folder={folder}/>

                      <ButtonModal title="update" placeholder="change the name of the file" titleBtnModal="update" 
                          onPress={ async () => {
                            
                            
                            setIsLoading(true)
                            await updateFile(item.id, changeText)
                            
                            await fetchFileHandler()
                              setIsLoading(false)
                          }}> 
                          <Input placeholder="change the name of the file" onChangeText={setChangeText} value={changeText} />
                      </ButtonModal>
                      <ButtonModal title="delete" textAlert="Are you sure that you want to delete the file !" titleBtnModal="delete" 
                          onPress={ async () => {
                                setIsLoading(true)
                                
                                await deleteFile(item.id)
                                
                                await fetchFileHandler()
                                setIsLoading(false)
                              
                              }}/>
                    </View>
                  )}
                  />
                )}
      </>
    )
}

export default FileList