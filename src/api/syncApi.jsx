import React, {useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';

const syncApi = () => {
  const {url} = useContext(AuthContext);

  const createSync = async formData => {
    try {
      const response = await fetch(`${url}/sync`, {
        method: 'POST',

        body: formData,
      });

      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error syncing file:', error);
      throw error;
    }
  };

  const fetchOriginalFiles = async id => {
    try {
      const response = await fetch(`${url}/fetchOriginalFiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching syncing file:', error);
      throw error;
    }
  };

  const fetchResizedFiles = async id => {
    try {
      const response = await fetch(`${url}/fetchResizedFiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching syncing file:', error);
      throw error;
    }
  };

  return {createSync, fetchOriginalFiles, fetchResizedFiles};
};

export default syncApi;
