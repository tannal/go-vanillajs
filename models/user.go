package models

type User struct {
	ID             int     `json:"id"`
	Name           string  `json:"name"`
	Email          string  `json:"email"`
	PasswordHash   string  `json:"-"`
	Watchlist      []Movie `json:"watchlist,omitempty"`
	Favorites      []Movie `json:"favorites,omitempty"`
	CreatedAt      string  `json:"created_at"`
	UpdatedAt      string  `json:"updated_at"`
	PasswordHashed string  `json:"-"`
	DeletedAt      *string `json:"deleted_at,omitempty"`
}
