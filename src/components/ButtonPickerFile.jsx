import React from "react";
import Button from "./Button";
import DocumentPicker from 'react-native-document-picker'
import fileApi from "../api/fileApi";

const ButtonPickerFile = ({id, folder}) => {

    const uploadFilesOnPressHandler = async () => {
        const { createFile } = fileApi()

        try {
      
          const pickerFile = await DocumentPicker.pick({
            allowMultiSelection: true,
            type: [DocumentPicker.types.allFiles]
          })
      
          pickerFile.forEach((element) => {
      
            const formData = new FormData();
            formData.append('photos', {
            uri: element.uri, // Path to the file
            type: element.type, // MIME type
            name: element.name, // File name
            });
      
            formData.append("ID", id)
            formData.append("folder", folder)
            createFile(formData);
          }) 
      
        } catch (error) {
      
          if (DocumentPicker.isCancel(error)) {
            console.log(error);
          } else {
            console.log(error);
            throw error
          }
      
        }
      
      }

    return (
        <Button title="import your files" onPress={uploadFilesOnPressHandler} id={id} folder={folder} backgroundColor="#0099ff"/>
    )

}

export default ButtonPickerFile;