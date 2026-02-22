import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, NativeModules, Image, Text, Switch, ScrollView } from "react-native";
import AuthContext from "../context/AuthContext";
import userApi from "../api/userApi";
import ButtonModal from "../components/ButtonModal";
import TextProfile from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import TextError from "../components/TextError";
import TextSuccess from "../components/TextSuccess";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { MediaStoreModule } = NativeModules;

const ProfileScreen = () => {
const [currentPassword, onChangeText] = useState('')
const [newPassword, setNewPassword] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const [successMessage, setSuccessMessage] = useState('')

const { id, name, email, logout, deleteAccount, folderSync } = useContext(AuthContext)
const { updateUser } = userApi()

const [folderSwitch, setFolderSwitch] = useState()

   async function fetchFileFunc() {
      // await AsyncStorage.removeItem('folderSync');

            const values = await AsyncStorage.getItem('folderSync')
            const sync = JSON.parse(values);

          console.log("asyncStorage ", sync);

          const folders = await MediaStoreModule.getImageFolders();

      setFolderSwitch(sync)

    }

  const toggleSwitch = (switchs, value) => {
    console.log("Full item data:", switchs);
    console.log("asyncStorage:", folderSwitch);
    const result = folderSwitch.map((item, index) => {

    if (item.id === switchs.id) {
      return {...item, boolean: value}
    }
    return item
});

    setFolderSwitch(result)
    folderSync(result)

console.log("result: ", result);

    
  };

  useEffect(() => {   
    
    fetchFileFunc()
  }, [])


    return (
        <ScrollView style={styles.container}>
          <TextProfile content={`Welcome ${name}`}/>
            <TextProfile content={`Email: ${email}`}/>
            <View>
            <FlatList
                    data={folderSwitch}
                    keyExtractor={item => item.name}
                    numColumns={1}
            
                     renderItem={({ item }) => (
                      <View style={{ flexDirection: "row", padding: 5}}>
                        <View style={{ padding: 10 }}>
                            <Image
                              key={item.id}
                              source={{ uri: item.lastImage }}
                              style={{ width: 110, height: 110, borderRadius: 8}}
            
                            />
                        </View>
                        <View style={{ display: "flex", justifyContent: "center"}}>
                          <Text style={{ color: "black", alignContent: "center", justifyContent: "center", fontSize: 18}}>{item.name}</Text>
                          <Text style={{ color: "black", alignContent: "center", justifyContent: "center"}}>{item.count} Photos</Text>
            
                        </View>
            
                        <View style={{ marginLeft: "auto", justifyContent: "center" }}>
                            <Switch
                              trackColor={{false: '#767577', true: '#81b0ff'}}
                              thumbColor={item.boolean ? '#1362eb' : '#f4f3f4'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={(value) => {toggleSwitch(item, value)}}
                              value={item.boolean}
                            />
                        </View>
                    </View>
                    )}
            
                  />
                  
                </View>
            <Input placeholder='Current password' onChangeText={onChangeText} value={currentPassword}/>
            {errorMessage ? <TextError errorMessage={errorMessage}/> : null}
            {successMessage ? <TextSuccess successMessage={successMessage}/> : null}

            <Input placeholder='New password'onChangeText={setNewPassword} value={newPassword}/>
            <Button title="update password" onPress={async () => {
               json = await updateUser(id, currentPassword, newPassword)
               console.log(json);
               {json.message ? setSuccessMessage(json.message): setErrorMessage(json.error)}
               
                
            }} backgroundColor="#CD5C5C"/>
            
            <View style={styles.bottomContainer}>


                  <ButtonModal title="Logged out" textAlert="Are you sure that you want to logout ?" titleBtnModal="logged out" onPress={async () => {
                    await logout()
                  }}/>
                  <ButtonModal title="Delete acccount" textAlert="Are you sure that you want to delete the account" titleBtnModal="Delete account" onPress={async () => {
                    await deleteAccount(id)                    
                  }} />
              
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 20
    },
  });

export default ProfileScreen