import Config from "react-native-config";

const userApi = () => {

  const createUser = async (name, email, password) => {
    try {
    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password})
    })

    return await response.json();
  
} catch (error) {
  console.error('Error creating user:', error);
  throw error; 
  }
}

return { createUser };
};


export default userApi;
