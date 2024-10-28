package db

import (
	"database/sql"
	_ "github.com/lib/pq"
)

// encapsulates the db sql object
type Database struct {
	db *sql.DB //lower case means private, not accessible outside the package
}
func NewDatabase() (*Database, error) {

	db, err := sql.Open("postgres", "postgres://root:password@localhost:5433/go-chat?sslmode=disable") //driver, connection string
	
	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

//method to close the db connection
//db is encapuslated, only way to close it is through this method
func (d *Database) Close() {
	d.db.Close()
}

//getter method to get the db object
func (d *Database) GetDB() *sql.DB {
	return d.db
}