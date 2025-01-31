import React, { useState } from "react";
import ModalComponent from "./Modal";
import { Text, View } from "react-native";
import Button from "./Button";

const ButtonModal = ({title, titleBtnModal, textAlert, id, triggerFunction}) => {

    const [modalFolderVisible, setModalFolderVisible] = useState(false)
    
    return (
        <>
            <ModalComponent
                visible={modalFolderVisible}
                onRequestClose={() => {
                    setModalFolderVisible(!modalFolderVisible);
                }}>
                <Text style={{ color: 'black'}}>{textAlert}</Text>
                <View>
                    <Button title={titleBtnModal} onPress={()=> {
                        triggerFunction(id)
                        setModalFolderVisible(!modalFolderVisible)                
                        }} backgroundColor="#0099ff"/>
                    <Button title="close" onPress={() => setModalFolderVisible(!modalFolderVisible)} backgroundColor="#CD5C5C"/>
                </View>
            </ModalComponent>

            <Button title={title} onPress={() => setModalFolderVisible(true)} backgroundColor="#0099ff"/>
        </>

    )
}

export default ButtonModal

