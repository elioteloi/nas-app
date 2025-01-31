import Config from "react-native-config";

const folderApi = () => {

    const createFolder = async (userid, folderName) => {
        try {
        
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/createFolder`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },        
            body:  JSON.stringify({
                userid: userid,
                folderName: folderName
            })
        })
        
          return await response.json();
    } catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }

    }

    const fetchFolder = async (id) => {
        try {
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/fetchFolder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id})
        })
      
          return await response.json();
        } catch (error) {
        console.error('Error fetching folder:', error);
        throw error; 
    }


    }

    const updateFolder = async (idFolder, folder) => {
        
        try {
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/updateFolder`, {
             method: 'put',
             headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                id: idFolder,
                folderName: folder
            })
        })
      
          return await response.json();
    } catch (error) {
        console.error('Error fetching folder:', error);
        throw error; 
    }

    
}

    const deleteFolder = async (id) => {        
        try {
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/deleteFolder/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    })

      return await response.json();
    } catch (error) {
        console.error('Error fetching folder:', error);
        throw error; 
    }
    
}
    return { createFolder, fetchFolder, updateFolder, deleteFolder }
}
export default folderApi

