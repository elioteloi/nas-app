import React, { useContext } from "react";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AuthContext from "../context/AuthContext";

import userApi from '../api/userApi';

import AuthContainer from "../components/AuthContainer";
import Title from "../components/Title";
import Input from "../components/Input"
import TextError from "../components/TextError";
import Button from "../components/Button"

const LoginScreen = () => {

  const {login} = useContext(AuthContext)

  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorBackend, setErrorBackend] = useState('')

  const { fetchUser } = userApi();

  const Login = async () => {
  
    const json = await fetchUser(email, password);
      
    if (json.success) {
     
      login(json)
      console.log(json);
      
    } else if (json.errorInput) {
      console.log(json.errorInput);
      setErrorMessage(json.errorInput)
    } else if (json.errorEmail) {
      console.log(json.errorEmail);
      setErrorMessage(json.errorEmail)
    } else if (json.errorPassword) {
      console.log("json error password: ", json.errorPassword);
      setErrorMessage(json.errorPassword)
    }
           
  }
  

  return(
    <AuthContainer>

      <Title title="Login"/>
      
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
      
      <Button title="Login" onPress={Login} backgroundColor="#0099ff"/>

      <Button title="Go to signin" onPress={() => navigation.navigate("signin")} backgroundColor="#0099ff"/>

    </AuthContainer>
  )
}

export default LoginScreen;