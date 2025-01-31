import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({title}) => {
    return (
        <>
            <Text style={styles.containerTitle}>{title}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    containerTitle: {
        textAlign: 'center',
        fontSize: 30,
        color: "black"
      },
})

export default Title