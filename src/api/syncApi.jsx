import React from "react";
import Config from "react-native-config";

const syncApi = () => {
        const createSync = async (formData) => {
          try {
            const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/sync`, {
                method: 'POST',
               
                body: formData
              })
                  
            let data = await response.json();
            return data;
            
          } catch (error) {
            console.error('Error syncing file:', error);
            throw error;
          }  
    }

     const fetchOriginalFiles = async (id) => {
          try {
            const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/fetchOriginalFiles`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id})
            })

            let data = await response.json()
            return data
          } catch (error) {
            console.error('Error fetching syncing file:', error);
            throw error;
          }
        }


        const fetchResizedFiles = async (id) => {
          try {
            const response = await fetch(`http://${Config.API_IP_ADDRESS}:${Config.PORT}/fetchResizedFiles`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id})
            })

            let data = await response.json()
            return data
          } catch (error) {
            console.error('Error fetching syncing file:', error);
            throw error;
          }
        }

    return { createSync, fetchOriginalFiles, fetchResizedFiles}
} 

export default syncApi;

