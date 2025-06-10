package data

import "tannal.org/reelingit/models"

type MovieStorage interface {
	GetTopMovies() ([]models.Movie, error)
	GetRandomMovie() ([]models.Movie, error)
	GetMovieByID(id int) (models.Movie, error)
	SearchMoviesByName(name string, order string, genre *int) ([]models.Movie, error)
	GetAllGenres() ([]models.Genre, error)
}
