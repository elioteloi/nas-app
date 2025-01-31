import React from "react";
import { StyleSheet, Text } from "react-native";

const TextError = ({errorMessage}) => {

    return (
        <Text style={styles.TextError}>{errorMessage}</Text>
    )
}

const styles = StyleSheet.create({
    TextError: {
        textAlign: 'center',
        color: "#DC143C",
        marginTop: 10,
      }
})

export default TextError