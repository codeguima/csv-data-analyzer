// src/config/index.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_ENDPOINTS = {
  // rotas de user
  REGISTER: `${API_BASE_URL}/api/postcsv`,
  FIND_PROFILES: ``,
  SEARCH_PROFILE: ``,

};

export default API_ENDPOINTS;
