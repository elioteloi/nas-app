import Config from "react-native-config";

const fileApi = () => {

    const createFile = async (file) => {
      try {
        const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/createFile`, {
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
    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/fetchFile`, {
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

  return { createFile, fetchFile };
};


export default fileApi;
