package util

import (
	"golang.org/x/crypto/bcrypt"
	"fmt"
)

func HashPassword(password string) (string, error) {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	
	if err != nil {	
		return "", fmt.Errorf("error hashing password: %w", err)
	}

	return string(hashedPassword), nil
}

func CheckPassword(password, hashedPassword string) error {
	
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}