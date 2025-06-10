package models

type Actor struct {
	ID        int     `json:"id"`
	FirstName string  `json:"first_name"`
	LastName  string  `json:"last_name"`
	ImageURL  *string `json:"image_url"`
	Name      string  `json:"name"` // 这个字段可能需要根据实际JSON结构决定是否需要下划线
}
