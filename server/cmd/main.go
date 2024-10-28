package main

import (
	"log"
	"github.com/mounicasruthi/pulse2.0/db" 
)

func main() {

	//calling the new db function
	_, err := db.NewDatabase()

	if err != nil {
		log.Fatal("Could not initialize database connection: %s", err)
	}

}