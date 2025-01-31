import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Folder = ({item}) => {
  const navigation = useNavigation();

    return (
        <TouchableOpacity  onPress={() =>
            navigation.navigate('Folder', {folder: item.foldername})
            }  style={styles.item}>
                <Image 
                    source={require('../../assets/images/folder.png')}
                    style={styles.image}
                    />
                <Text style={styles.text}>{item.foldername}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: 190,
    margin: '1%',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
  },

  image: {
    width: 60, 
    height: 60 
  },
  
  text: {
    color: "black",
  }
});


export default Folder