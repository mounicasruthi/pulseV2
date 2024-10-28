package ws

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"fmt"
	"github.com/gorilla/websocket"
)

type Handler struct {

	hub *Hub
}

func NewHandler(h *Hub) *Handler {
	return &Handler{
		hub: h,
	}
}

type CreateRoomReq struct {
	ID string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) CreateRoom(c *gin.Context) {

	var req CreateRoomReq
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println("Error binding json", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//storing room info in memory
	h.hub.Rooms[req.ID] = &Room{
		ID: req.ID,
		Name: req.Name,
		Clients: make(map[string]*Client),
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room created successfully"})
}

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *Handler) JoinRoom(c *gin.Context) {

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	roomID := c.Param("roomID")
	clientID := c.Param("userID")
	username := c.Param("username")

	cl := &Client {
		Conn: conn,
		Message: make(chan *Message, 10),
		ID: clientID,
		RoomID: roomID,
		Username: username,
	}

	m := &Message{
		Content: fmt.Sprintf("%s has joined the room", username),
		RoomID: roomID,
		Username: username,
	}

	//Register the client through the register channel
	h.hub.Register <- cl

	//Broadcast the message to all clients in the room
	h.hub.Broadcast <- m

	//Start the writeMessage and readMessage go routines
	go cl.writeMessage()
	cl.readMessage(h.hub)


}
	

type RoomRes struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (h *Handler) GetRooms(c *gin.Context) {
	rooms := make([]RoomRes, 0)

	for _, r := range h.hub.Rooms {
		rooms = append(rooms, RoomRes{
			ID:   r.ID,
			Name: r.Name,
		})
	}

	c.JSON(http.StatusOK, rooms)
}

type ClientRes struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}

func (h *Handler) GetClients(c *gin.Context) {
	var clients []ClientRes
	roomId := c.Param("roomId")

	if _, ok := h.hub.Rooms[roomId]; !ok {
		clients = make([]ClientRes, 0)
		c.JSON(http.StatusOK, clients)
	}

	for _, c := range h.hub.Rooms[roomId].Clients {
		clients = append(clients, ClientRes{
			ID:       c.ID,
			Username: c.Username,
		})
	}

	c.JSON(http.StatusOK, clients)
}
