

export const API = {
  baseURL: 'http://localhost:8080', // Replace with your actual base URL
  getTopMovies: async (page = 1) => {
    return API.fetch(`/api/movies/top`);
  },

  getRandomMovies: async () => {
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

fetch: async (serviceName, args) => {
    try {
        const queryString = args ? new URLSearchParams(args).toString() : "";
        const response = await fetch(API.baseURL + serviceName + "?" + queryString);
        const result = await response.json();
        return result;
    } catch (e) {
        console.error(e);
    }
}
}



