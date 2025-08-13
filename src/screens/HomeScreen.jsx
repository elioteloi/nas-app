import Button from "../components/Button";
import React, {useContext, useEffect, useState} from 'react';

import folderApi from "../api/folderApi";
import NotConnected from "../components/NotConnected";
import FolderList from "../components/FolderList";
import AuthContext from "../context/AuthContext";
import Input from "../components/Input";
import Loading from "../components/Loading";

const HomeScreen = () => {
  
  const {id, fetchFolderHandler, noWifi} = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [changeText, setChangeText] = useState('')
  
  const { createFolder, fetchFolder, updateFolder, deleteFolder } = folderApi()


  useEffect(() => {
    
    fetchFolderHandler()
  }, [])



  return (
    <>{noWifi ? (  
      <NotConnected />)
        :
        (
          <>
            <Input onChangeText={setChangeText} value={changeText} placeholder="create a name for the folder"/>
            <Button
              title="Create Folder"
              onPress={ async () => {
                setIsLoading(true)
                await createFolder(id, changeText)
          
                await fetchFolderHandler();
                setIsLoading(false)
                
                
              }}
              backgroundColor="#0099ff"
            />
            {isLoading ? (<Loading/>) : (<FolderList/>)}
          </>
        )
      }
    </>
   
  )
}

export default HomeScreen




