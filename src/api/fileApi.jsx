import Config from "react-native-config";

const fileApi = () => {

    const createFile = async (file) => {
      try {
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/createFile`, {
            method: 'POST',
           
            body: file
          })
    
        return await response.json();
      } catch (error) {
        console.error('Error creating file:', error);
        throw error;
      }  
}

const fetchFile = async (id, folder) => {
  try {
    const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/fetchFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, folder }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
};


  const updateFile = async (id, name) => {
    
    try {
      const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/updateFile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name
        })
      })
  
      return await response.json();
    } catch (error) {
      console.error('Error updating file:', error);
      throw error;
    }
  }

  const deleteFile = async (id) => {
    try {
      
      const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/deleteFile/${id}`, {
        method: "DELETE",
          headers: {
            "Content-Type": "application/json",
        },
      })
  
      return await response.json();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
   
  }


  return { createFile, fetchFile, updateFile, deleteFile };
};


export default fileApi;
