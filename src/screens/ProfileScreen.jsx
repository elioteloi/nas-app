import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import userApi from "../api/userApi";
import Input from "../components/Input";
import TextProfile from "../components/Text";
import ButtonModal from "../components/ButtonModal";
import ChangePassword from "../components/ChangePassword";

const ProfileScreen = () => {
const [currentPassword, onChangeText] = useState('')
const [newPassword, setNewPassword] = useState('')

const { id, name, email, logout } = useContext(AuthContext)
const { updateUser, deleteUser } = userApi()

  const handleUpdate = (id, currentPassword, newPassword) => {
    updateUser(id, currentPassword, newPassword)
  }

  const handleDelete = (id) => {
    logout
    deleteUser(id)
  }
    return (
        <View style={styles.container}>
            <ChangePassword id={id} name={name} email={email} triggerFunction={handleUpdate}/>
            <View style={styles.bottomContainer}>


                  <ButtonModal title="logged out" textAlert="Are you sure that you want to logout ?" titleBtnModal="logged out" triggerFunction={logout}/>
                  <ButtonModal title="Delete acccount" textAlert="Are you sure that you want to delete the account" titleBtnModal="Delete account" id={id} triggerFunction={handleDelete}/>
              
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