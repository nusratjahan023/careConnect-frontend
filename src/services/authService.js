import axios from 'axios';

import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:8081/users/login', {
    email,
    password,
  });

  return response.data; 
};