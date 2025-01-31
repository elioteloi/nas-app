import { useNavigation } from "@react-navigation/native";
import Config from "react-native-config";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const File = ({ item, folder }) => {

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate('File', {
                userdrive: item.userdrive,
                folder: folder,
                filename: item.filename,
                originalname: item.originalname})}>
            <Image 
                source={{ uri: `http://${Config.API_IP_ADDRESS}:3000/path_Of_Drive/${item.userdrive}/${folder}/${item.filename}`}}
                style={{ width: 120, height: 120 }}
                onError={(error) => console.error('Image loading error:', error.nativeEvent.error)}
            />
        </TouchableOpacity>
    )
}

export default File