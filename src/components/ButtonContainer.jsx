import React from "react";
import { StyleSheet, View } from "react-native";

const ButtonContainer = ({children}) => {

    return (
        <View style={styles.container}>
          {children}
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
   
  });


export default ButtonContainer