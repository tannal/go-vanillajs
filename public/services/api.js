

export const API = {
  getTopMovies: async (page = 1) => {
    return API.fetch(`/api/movies/top`);
  },

  getRandomMovie: async () => {
    return API.fetch(`/api/movies/random`);
  },

  getMovieById: async (id) => {
    if (!id) throw new Error('Movie ID is required');
    return API.fetch(`/api/movies/${id}`);
  },

  searchMovies: async (query, order, genres) => {
    if (!query) throw new Error('Search query is required');
    return API.fetch(`/api/movies/search`, {query, order, genres});
  },

  fetch: async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
}



