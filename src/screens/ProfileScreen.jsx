import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthContext from "../context/AuthContext";
import userApi from "../api/userApi";
import ButtonModal from "../components/ButtonModal";
import TextProfile from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import TextError from "../components/TextError";
import TextSuccess from "../components/TextSuccess";

const ProfileScreen = () => {
const [currentPassword, onChangeText] = useState('')
const [newPassword, setNewPassword] = useState('')
const [errorMessage, setErrorMessage] = useState('')
const [successMessage, setSuccessMessage] = useState('')

const { id, name, email, logout, deleteAccount } = useContext(AuthContext)
const { updateUser } = userApi()



    return (
        <View style={styles.container}>
          <TextProfile content={`Welcome ${name}`}/>
            <TextProfile content={`Email: ${email}`}/>
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
        </View>
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
    },
  });

export default ProfileScreen