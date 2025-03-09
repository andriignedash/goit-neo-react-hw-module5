import axios from "axios";

const API_KEY = "mCV0NY5KNl_-t0dfqKeloD_siNT-DR-jLFX28fk2rL8";
const API_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page) => {
  const response = await axios.get(API_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};
