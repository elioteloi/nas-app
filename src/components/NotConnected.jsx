import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const NotConnected = () => {
    
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/no-wifi.png')}
                style={styles.image}
                /> 
            <Text style={styles.text}>Not connected to wifi.</Text>
        </View>             
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', alignItems: 'center'
    }, 
    image: {
        width: 260, 
        height: 260, 
    },
    text: {
        color: 'black',fontSize: 20, fontWeight: 'bold'
    }
})

export default NotConnected