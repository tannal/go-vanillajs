

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
    return API.fetch(`/api/movies/search`, { query, order, genres });
  },

  getFavoriteMovies: () => {
    return API.fetch(`/api/movies/favorites`);
  },

  login: async (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');
    const response = await fetch(API.baseURL + "/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  },

  register: async (data) => {
    if (!data || !(data instanceof FormData)) throw new Error('Form data is required');
    const response = await fetch(API.baseURL + "/api/account/register", {
      method: "POST",
      body: data
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  },

  send: async (serviceName, args) => {
      try {
        const response = await fetch(API.baseURL + serviceName, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(args)
        });
        const result = await response.json();
        return result;
      } catch (e) {
        console.error(e);
      }
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



