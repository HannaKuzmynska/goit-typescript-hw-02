import axios from 'axios';
const API_KEY = 'NGRc-9E_xYC5jKiByp3l2ywPCwiw5uWagtLaRf454ik';
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query: query,
        page: page,
        per_page: 12,
        client_id: API_KEY,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('No images found for the search query.');
    }

    return response.data;
  } catch (error) {
    // Simply rethrow the error without logging it here
    throw new Error(error.response?.data?.errors?.[0] || 'Failed to fetch images');
  }
};
