import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// Create AuthContext
const AuthContext = createContext(); 

// Create AuthProvider as a functional component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  
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
  
      // Store the user object in AsyncStorage
     let storage = JSON.stringify(user)
      await AsyncStorage.setItem('storage', storage);
      
      setIsLoggedIn(true);  


    } catch (error) {
      console.log("Failed to store login state", error);
    }
  };

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('storage');
    } catch (error) {
      console.error('Failed to remove item from AsyncStorage:', error);
    }
  };


  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, id, name, email, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
