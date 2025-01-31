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


  const fetchUser = async (email, password) => {
    try {
    const response = await fetch(`http://${Config.API_IP_ADDRESS}:3000/fetchUser`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
    
        return await response.json();
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }  
  };

return { createUser, fetchUser };
};


export default userApi;
