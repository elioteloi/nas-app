import React from "react";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

import userApi from "../api/userApi";

import Button from "../components/Button";
import Input from "../components/Input";
import Title from "../components/Title";
import TextError from "../components/TextError";
import AuthContainer from "../components/AuthContainer";

const SigninScreen = () => {
  
  const navigation = useNavigation();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorBackend, setErrorBackend] = useState('')

  const {createUser} = userApi()

  const Signin = async () => {

    const json = await createUser(name, email, password)
    
        if (json.success) {
          console.log(json.success);
          navigation.navigate(json.redirectUrl)
          setErrorMessage(json.success)
        } else if (json.errorInput) {
          console.log(json.errorInput);
          setErrorMessage(json.errorInput)
        } else if (json.errorEmail) {
          console.log(json.errorEmail);
          setErrorMessage(json.errorEmail)
        }
        console.log(json.errorInput);
  }

  return(
    <AuthContainer>

      <Title title="Signin"/>
      
      <Input
        placeholder="name"
        value={name}
        onChangeText={setName}
      />

      <Input
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />

      {errorMessage ? <TextError errorMessage={errorMessage}/> : null} 
      {errorBackend ? <TextError errorMessage={errorBackend}/> : null} 

      <Input
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      
      <Button title="Signin" onPress={Signin} backgroundColor="#0099ff"/>

      <Button title="Go to login" onPress={() => navigation.navigate("login")} backgroundColor="#0099ff"/>

    </AuthContainer>
  )
}

export default SigninScreen;