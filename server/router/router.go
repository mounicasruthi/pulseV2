package router

import (
	"github.com/gin-gonic/gin"
	"github.com/mounicasruthi/pulse2.0/internal/user"
	"github.com/mounicasruthi/pulse2.0/internal/ws"
	"log"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler) {

	r = gin.Default()

	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)
	r.GET("/logout", userHandler.Logout)
	
	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("/ws/joinRoom/:roomID", wsHandler.JoinRoom)
	r.GET("/ws/getRooms", wsHandler.GetRooms)
	r.GET("/ws/getClients/:roomID", wsHandler.GetClients)
}

// Start initializes the server at the given address
func Start(addr string) error {
	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to start server on %s: %v", addr, err)
		return err
	}
	return nil
}