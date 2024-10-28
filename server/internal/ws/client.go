package ws

import "github.com/gorilla/websocket"
import "log"

type Client struct {
	Conn *websocket.Conn
	Message chan *Message
	ID string `json:"id"`
	RoomID string `json:"room_id"`
	Username string `json:"username"`
}

type Message struct {
	Content string `json:"content"`
	RoomID string `json:"room_id"`
	Username string `json:"username"`
}


func (c *Client) writeMessage() {
	//closing the connection when the function returns
	defer func() {
		c.Conn.Close()
	}()

	// continuously read from the message channel and write to the connection
	for {
		message, ok := <-c.Message
		if !ok {
			return
		}

		//write the message to the connection
		c.Conn.WriteJSON(message)
	}
}

//readMessage reads the message from the connection and sends it to the hub
func (c *Client) readMessage(hub *Hub) {

	//unregister the client and close the connection when the function returns
	defer func() {
		hub.Unregister <- c
		c.Conn.Close()
	}()

	//continuously read from the connection and send the message to the hub
	for {
		_, m, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		//create a message object and send it to the hub
		msg := &Message{
			Content:  string(m),
			RoomID:   c.RoomID,
			Username: c.Username,
		}

		//broadcast the message to the hub
		hub.Broadcast <- msg
	}
}