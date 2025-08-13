import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Loading = () => {

    return (
        <View style={styles.Text}>
            <Text style={styles.Text}>Loading...</Text>
            <Text style={styles.Text}>Your data is being processed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        display: "flex",
    },
    Text: {
        textAlign: "center",
        fontSize: 20,
        color: "black",
        marginTop: 40
    }
})

export default Loading