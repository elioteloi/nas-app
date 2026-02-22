import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import folderApi from '../api/folderApi';
import userApi from '../api/userApi';

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [data, setData] = useState([])
  const [noWifi, setNoWifi] = useState(true)
  const [ folder, setFolder ] = useState()
  const { fetchFolder } = folderApi()
  const { deleteUser } = userApi()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('storage');
        if (value) {
          
          const data = JSON.parse(value);
          setId(data.id)
          setName(data.name)
          setEmail(data.email)
          setIsLoggedIn(data.boolean);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error('Error reading value', e);
        setIsLoggedIn(false);
      }
    };  

    checkLoginStatus();
  }, []);

  const login = async (value) => {    

    try {
      
      const user = {
        boolean: true,
        id: value.id,
        name: value.name,
        email: value.email
      };
  
     let storage = JSON.stringify(user)
      await AsyncStorage.setItem('storage', storage);
      
      setIsLoggedIn(true);  


    } catch (error) {
      console.log("Failed to store login state", error);
    }
  };

  const folderSync = async (value) => {

    try {

      let storage = JSON.stringify(value)
      await AsyncStorage.setItem('folderSync', storage);
    
  } catch (e) {
    console.error("error storing sync folder: ", e);
    
  }
    // let values = JSON.stringify(value)
    // await AsyncStorage.setItem('folderSync: ', false);  
    // setFolder(false)  
    // // console.log("folder sync: ", value);
    

  }

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('storage');
    } catch (error) {
      console.error('Failed to remove item from AsyncStorage:', error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      await deleteUser(id)
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('storage');
    } catch (error) {
      console.error('Failed to remove item from AsyncStorage:', error);
    }
  };

   const fetchFolderHandler = async () => {
    try {

      const values = await AsyncStorage.getItem('storage')
      
      if (!values) {
        console.error('No data found in storage');
        return;
      }
      
      const users = JSON.parse(values);

      const json = await fetchFolder(users.id);
      setNoWifi(false)
      setData(json.result);          

    } catch (error) {
      console.error('Error in fetchFolderHandler', error);
    }
    

  }


  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, id, name, email, logout, deleteAccount, fetchFolderHandler, folderSync, data, noWifi, folder }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
