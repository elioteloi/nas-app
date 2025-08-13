import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

const Button = ({title, onPress, backgroundColor}) => {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor}]} 
        onPress={() => {
            onPress();
        }}
 >
            <Text style={styles.TextButton}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      TextButton: {
        color: "#F5F5F5",
      },
})
export default Button;