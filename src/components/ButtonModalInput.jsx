import React, { useState } from "react";
import Modal from "./Modal";
import { View } from "react-native";
import Input from "./Input";
import Button from "../components/Button"

const ButtonModalInput = ({title, placeholder, titleBtnModal, id, triggerFunction}) => {

    const [modalFolderVisible, setModalFolderVisible] = useState(false)
    const [changeText, setChangeText] = useState('')
    
    return (
        <>
            <Modal
                visible={modalFolderVisible}
                onRequestClose={() => {
                    setModalFolderVisible(!modalFolderVisible);
                }}>
                <Input onChangeText={setChangeText} value={changeText} placeholder={placeholder}/>
                <View>
                    <Button title={titleBtnModal} onPress={()=> {
                        triggerFunction(id, changeText)
                        setModalFolderVisible(!modalFolderVisible)                
                        }} backgroundColor="#0099ff"/>
                    <Button title="close" onPress={() => setModalFolderVisible(!modalFolderVisible)} backgroundColor="#CD5C5C"/>
                </View>
            </Modal>

            <Button title={title} onPress={() => setModalFolderVisible(true)} backgroundColor="#0099ff"/>
        </>

    )
}

export default ButtonModalInput

