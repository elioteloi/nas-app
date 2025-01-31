import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({placeholder, value, onChangeText, secureTextEntry}) => {
    return (
        <>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry={secureTextEntry}
            />
        </>

    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        color: "black",
        backgroundColor: "#F5F5F5",
        borderColor: "#ccc",
        borderWidth: 1,
      },
})

export default Input