package main

import (
	"log"
	"github.com/mounicasruthi/pulse2.0/db" 
	"github.com/mounicasruthi/pulse2.0/internal/user"
	"github.com/mounicasruthi/pulse2.0/router"
)

func main() {

	//calling the new db function
	dbConn, err := db.NewDatabase()

	if err != nil {
		log.Fatal("Could not initialize database connection: %s", err)
	}

	//initialize the user repository, service and handler
	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	//initialize the router
	router.InitRouter(userHandler)
	router.Start("0.0.0.0:8080")
}