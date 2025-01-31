import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TextProfile = ({content}) => {
  return (
    <View style={styles.textContent}>
        <Text style={styles.Text}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textContent: {
        padding: 15,
      },
      Text: {
        color: "black",
        fontSize: 20
      },
})

export default TextProfile