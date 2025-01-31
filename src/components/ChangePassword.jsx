import React, { useState } from "react";
import TextProfile from "./Text";
import Input from "./Input";
import Button from "./Button";

const ChangePassword = ({id, name, email, triggerFunction}) => {

const [currentPassword, onChangeText] = useState('')
const [newPassword, setNewPassword] = useState('')

    return (
        <>
            <TextProfile content={`Welcome ${name}`}/>
            <TextProfile content={`Email: ${email}`}/>
            <Input placeholder='Current password' onChangeText={onChangeText} value={currentPassword}/>
            <Input placeholder='New password'onChangeText={setNewPassword} value={newPassword}/>
            <Button title="update password" onPress={() => triggerFunction(id, currentPassword, newPassword)} backgroundColor="#CD5C5C"/>
        </>
    )
}


export default ChangePassword