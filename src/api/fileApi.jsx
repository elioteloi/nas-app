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

  return { createFile };
};


export default fileApi;
