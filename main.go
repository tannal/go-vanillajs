package main

import (
	"database/sql"
	"net/http"
	"os"

	_ "github.com/lib/pq"

	"github.com/joho/godotenv"
	"tannal.org/reelingit/data"
	"tannal.org/reelingit/handlers"
	"tannal.org/reelingit/logger"
)

func main() {

	// Initialize the logger
	logger, err := logger.NewLogger("server.log")

	if err == nil {
		logger.Error("Failed to create logger", err)
	}

	// Environment variables
	if err := godotenv.Load(); err != nil {
		logger.Error("Failed to load environment variables:", err)
		return
	}

	// Connect to the database
	dbConnectionString := os.Getenv("DATABASE_URL")

	if dbConnectionString == "" {
		logger.Error("DATABASE_URL environment variable is not set", err) // 移除 err
		return
	}

	db, err := sql.Open("postgres", dbConnectionString)
	if err != nil {
		logger.Error("Failed to open database connection:", err)
		return
	}
	logger.Info("Connecting to the database..." + dbConnectionString)
	defer db.Close() // 补上右括号

	movieRepository, err := data.NewMovieRepository(db, logger)
	if err != nil {
		logger.Error("Failed to create movie repository:", err)
		return
	}
	accountRepository, err := data.NewAccountRepository(db, logger)

	if err != nil {
		logger.Error("Failed to create account repository:", err)
		return
	}

	movieHandler := handlers.NewMovieHandler(movieRepository, *logger)
	accountHandler := handlers.NewAccountHandler(accountRepository, logger)

	http.HandleFunc("/", http.FileServer(http.Dir("./public")).ServeHTTP)
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/search", movieHandler.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandler.GetMovie)
	http.HandleFunc("/api/genres", movieHandler.GetGenres)
	http.HandleFunc("/api/account/register", accountHandler.Register)
	http.HandleFunc("/api/account/authenticate", accountHandler.Authenticate)

	http.Handle("/api/account/favorites/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetFavorites)))
	http.Handle("/api/account/watchlist/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetWatchlist)))
	http.Handle("/api/account/save-to-collection/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.SaveToCollection)))

	http.Handle("/api/account/",
		accountHandler.AuthMiddleware(http.HandlerFunc(accountHandler.GetCurrentAccount)))

	catchAllHandler := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	}

	http.HandleFunc("/movies", catchAllHandler)
	http.HandleFunc("/movies/", catchAllHandler)
	http.HandleFunc("/account", catchAllHandler)
	http.HandleFunc("/account/", catchAllHandler)

	const addr = ":8080"
	err = http.ListenAndServe(addr, nil)

	if err != nil {
		logger.Error("Failed to start server:", err)
	}

	logger.Info("Server is running on" + addr)
	logger.Info("Visit http://localhost" + addr + " to see the server in action.")
	logger.Info("Press Ctrl+C to stop the server.")
}
