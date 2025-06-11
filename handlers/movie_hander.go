package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"tannal.org/reelingit/data"
	"tannal.org/reelingit/logger"
	"tannal.org/reelingit/models"
)

type MovieHandler struct {
	storage data.MovieStorage
	logger  logger.Logger
}

func NewMovieHandler(storage data.MovieStorage, logger logger.Logger) *MovieHandler {
	return &MovieHandler{
		storage: storage,
		logger:  logger,
	}
}

// Utility functions
func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.logger.Error("Failed to encode response", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return err
	}
	return nil
}

func (h *MovieHandler) handleStorageError(w http.ResponseWriter, err error, context string) bool {
	if err != nil {
		if err == data.ErrMovieNotFound {
			http.Error(w, context, http.StatusNotFound)
			return true
		}
		h.logger.Error(context, err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return true
	}
	return false
}

func (h *MovieHandler) parseID(w http.ResponseWriter, idStr string) (int, bool) {
	id, err := strconv.Atoi(idStr)
	if err != nil {
		h.logger.Error("Invalid ID format", err)
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return 0, false
	}
	return id, true
}

func (h *MovieHandler) SearchMovies(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	order := r.URL.Query().Get("order")
	genreStr := r.URL.Query().Get("genre")

	var genre *int
	if genreStr != "" {
		genreInt, ok := h.parseID(w, genreStr)
		if !ok {
			return
		}
		genre = &genreInt
	}

	var movies []models.Movie
	var err error
	if query != "" {
		movies, err = h.storage.SearchMoviesByName(query, order, genre)
	}
	if h.handleStorageError(w, err, "Failed to get movies") {
		return
	}
	if h.writeJSONResponse(w, movies) == nil {
		h.logger.Info("Successfully served movies")
	}
}

func (h *MovieHandler) GetMovie(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/api/movies/"):]
	id, ok := h.parseID(w, idStr)
	if !ok {
		return
	}

	movie, err := h.storage.GetMovieByID(id)
	if h.handleStorageError(w, err, "Failed to get movie by ID") {
		return
	}
	if h.writeJSONResponse(w, movie) == nil {
		h.logger.Info("Successfully served movie with ID: " + idStr)
	}
}

func (h *MovieHandler) GetGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := h.storage.GetAllGenres()
	if h.handleStorageError(w, err, "Failed to get genres") {
		return
	}
	if h.writeJSONResponse(w, genres) == nil {
		h.logger.Info("Successfully served genres")
	}
}

func (m *MovieHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

}

func (m *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := m.storage.GetRandomMovie()
	if err != nil {
		m.logger.Error("Failed to get random movies", err)
		http.Error(w, "Failed to get random movies", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(movies)
	if err != nil {
		http.Error(w, "Failed to encode movies", http.StatusInternalServerError)
		return
	}
	// w.WriteHeader(http.StatusOK)
}

func (m *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := m.storage.GetTopMovies()
	if err != nil {
		m.logger.Error("Failed to get top movies", err)
		http.Error(w, "Failed to get top movies", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(movies)
	if err != nil {
		http.Error(w, "Failed to encode movies", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
