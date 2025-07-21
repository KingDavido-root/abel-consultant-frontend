export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
