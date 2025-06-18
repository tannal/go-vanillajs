

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

  getFavorites: async () => {
    try {
      return await API.fetch("/api/account/favorites");
    } catch (e) {
      app.Router.go("/account/")
    }
  },
  getWatchlist: async () => {
    try {
      return await API.fetch("/api/account/watchlist");
    } catch (e) {
      app.Router.go("/account/")
    }

  },
  saveToCollection: async (movie_id, collection) => {
    return await API.send("/api/account/save-to-collection/", {
      movie_id, collection
    });
  },

  login: async (email, password) => {
    if (!email || !password) throw new Error('Username and password are required');
    const response = await fetch(API.baseURL + "/api/account/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
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

  send: async (service, args) => {
    const response = await fetch(API.baseURL + service, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": app.Store.jwt ? `Bearer ${app.Store.jwt}` : null
      },
      body: JSON.stringify(args)
    });
    const result = await response.json();
    return result;
  },
  fetch: async (service, args) => {
    const queryString = args ? new URLSearchParams(args).toString() : "";
    const response = await fetch(API.baseURL + service + '?' + queryString, {
      headers: {
        "Authorization": app.Store.jwt ? `Bearer ${app.Store.jwt}` : null

      }
    });
    const result = await response.json();
    return result;
  },
}



