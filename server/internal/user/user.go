// contains models and methods for user
package user

import (
	"context"
	
)

// User struct
type User struct {
	ID  int64  `json:"id" db:"id"`
	Username  string `json:"username" db:"username"`
	Email  string `json:"email" db:"email"`
	Password  string `json:"password" db:"password"`
}


type CreateUserReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateUserRes struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// Repository interface
type Repository interface {
	CreateUser(ctx context.Context, user *User) (*User, error)
}

// Service interface
type Service interface {
	CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error)
}