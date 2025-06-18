package token

import (
	"github.com/golang-jwt/jwt/v5"
	"tannal.org/reelingit/logger"
)

func ValidateJWT(tokenString string, logger logger.Logger) (*jwt.Token, error) {
	jwtSecret := GetJWTSecret(logger)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Ensure the token's signing method is HMAC
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			logger.Error("Unexpected signing method", nil)
			return nil, jwt.ErrTokenSignatureInvalid
		}
		return []byte(jwtSecret), nil
	})

	if err != nil {
		logger.Error("Failed to validate JWT", err)
		return nil, err
	}

	if !token.Valid {
		logger.Error("Invalid JWT token", nil)
		return nil, jwt.ErrTokenInvalidId
	}

	return token, nil
}

// GetJWTSecret retrieves the JWT secret from the logger's configuration.
func GetJWTSecret(logger logger.Logger) string {
	// Assuming the logger has a method to get configuration values
	jwtSecret := logger.GetConfigValue("jwt_secret")
	if jwtSecret == "" {
		logger.Error("JWT secret is not configured", nil)
		return ""
	}
	return jwtSecret
}
