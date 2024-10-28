package main

import (
	"log"
	"github.com/mounicasruthi/pulse2.0/db" 
	"github.com/mounicasruthi/pulse2.0/internal/user"
	"github.com/mounicasruthi/pulse2.0/router"
	"github.com/joho/godotenv"
	"os"
	"github.com/mounicasruthi/pulse2.0/internal/ws"
)

func main() {

	 // Load .env file
	 if err := godotenv.Load(); err != nil {
        log.Fatal("Error loading .env file")
    }

    // Retrieve the secret key
    secretKey := os.Getenv("JWT_SECRET")
    if secretKey == "" {
        log.Fatal("JWT_SECRET is not set in the environment")
    }

	//calling the new db function
	dbConn, err := db.NewDatabase()

	if err != nil {
		log.Fatal("Could not initialize database connection: %s", err)
	}

	//initialize the user repository, service and handler
	userRep := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userRep)
	userHandler := user.NewHandler(userSvc)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)

	//seperate go routine to run the hub
	go hub.Run()

	//initialize the router
	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}