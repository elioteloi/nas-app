import React from "react"
import { View, StyleSheet } from "react-native";

const AuthContainer = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#E5E7EB",
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
    
});

export default AuthContainer
