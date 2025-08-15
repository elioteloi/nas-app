import React from "react";
import { StyleSheet, Text } from "react-native";

const TextSuccess = ({successMessage}) => {

    return (
        <Text style={styles.TextSuccess}>{successMessage}</Text>
    )
}

const styles = StyleSheet.create({
    TextSuccess: {
        textAlign: 'center',
        color: "#14dc50ff",
        marginTop: 10,
      }
})

export default TextSuccess