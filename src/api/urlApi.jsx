import React from 'react';

const urlApi = () => {
  const fetchUrl = async url => {
    try {
      const response = await fetch(`${url}/health`, {
        method: 'get',
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching folder:', error);
      return error;
    }
  };
  return {fetchUrl};
};

export default urlApi;
