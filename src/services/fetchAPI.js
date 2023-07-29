import axios from 'axios';

const API_KEY = 'e57746b2e4fe98cb5cc839cb405a15f1';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchAPI(page) {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.error('getTrendingFilms error' + error);
  }
}

export async function getMoviesSearch(query, page = 1) {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );

    return await response.data;
  } catch (error) {
    console.error('getMoviesSearch error' + error);
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    );
    return await response.data;
  } catch (error) {
    console.error('getMovieDetails error' + error);
  }
}

export async function getCast(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
    return await response.data;
  } catch (error) {
    console.error('getCast error' + error);
  }
}
export async function getReviews(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
    );
    return await response.data;
  } catch (error) {
    console.error('getReviews error' + error);
  }
}
