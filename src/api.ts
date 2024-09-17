import axios from 'axios';

const API_KEY = 'NGRc-9E_xYC5jKiByp3l2ywPCwiw5uWagtLaRf454ik';
const BASE_URL = 'https://api.unsplash.com';

interface ImageResponse {
  results: Array<{
    id: string;
    user: { name: string };
    likes: number;
    urls: { small: string; regular?: string }; 
  }>;
  total_pages: number;
}

export const fetchImages = async (query: string, page = 1): Promise<ImageResponse> => {
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
  } catch (error: any) {
    throw new Error(error.response?.data?.errors?.[0] || 'Failed to fetch images');
  }
};