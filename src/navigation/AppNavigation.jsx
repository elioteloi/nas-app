import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SigninScreen from '../screens/SigninScreen';
import AuthContext, { AuthProvider } from '../context/AuthContext';
import FolderScreen from '../screens/FolderScreen';
import FileScreen from '../screens/FileScreen';
import PictureScreen from '../screens/PictureScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const AppStack = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='signin'>
        {isLoggedIn ? (
          <>
          <Stack.Screen
            name="Tab"
            component={AppTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Folder"
            component={FolderScreen}
            options={({ route }) => ({
              title: route.params?.folder || 'Folder',
            })}
          />
          <Stack.Screen
            name="File" 
            component={FileScreen}
            options={({ route }) => ({
              title: route.params?.originalname || 'File',
            })}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="signin"
              component={SigninScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({size, focused, color}) => {
          return (
            <Image
            style={{ width: size, height: size, tintColor: focused ? '#0099ff' : 'gray',}}
            source={require('../../assets/images/folder.png')}
            />
          )
        }
      }}/>
      <Tab.Screen name='Pictures' component={PictureScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({size, focused, color}) => {
          return (
            <Image
            style={{ width: size, height: size, tintColor: focused ? '#0099ff' : 'gray',}}
            source={require('../../assets/images/photo.png')}
            />
          )
        }
      }}/>
      <Tab.Screen name='Profile' component={ProfileScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({size, focused, color}) => {
          return (
            <Image
            style={{ width: size, height: size, tintColor: focused ? '#0099ff' : 'gray',}}
            source={require('../../assets/images/user.png')}
            />
          )
        }
      }}/>
    </Tab.Navigator>
  )
}

const AppNavigation = () => {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
};

export default AppNavigation;
