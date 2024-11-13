# Real-Time Chat Application with WebSockets

### A fully dynamic, real-time messaging platform built with Next.js, Go, WebSockets, and TypeScript.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Future Enhancements](#future-enhancements)

---

## Introduction

This project is a feature-rich, real-time chat application that leverages **WebSockets** to provide a seamless user experience with instant message delivery across chat rooms. Designed with a focus on scalability and modularity, this chat application serves as an example of modern, dynamic, multi-user communication software that meets the needs of both real-time interactions and state persistence.

The project includes:
- **Real-time communication** with instant messaging across rooms.
- **User authentication** to enable secure chat sessions.
- **Room management** allowing users to create, join, and leave rooms.
- **Efficient UI design** that auto-resizes input fields and optimally displays messages.

This application offers both a robust backend built in **Go** (Golang) and a responsive frontend powered by **Next.js**.

---

## Features

- **WebSocket-Based Real-Time Messaging**: Every message is delivered instantly using WebSocket connections, ensuring a low-latency experience.
- **User Authentication**: User authentication through JWT tokens, allowing only authorized users to access chat rooms.
- **Room Management**: Each room dynamically displays its list of active users. New users can join an existing room or create a new room with ease.
- **Dynamic Message Parsing and Display**: Messages from each user are parsed and displayed with identifiers (`self` or `recv`), formatted as per user roles.
- **Auto-Resizing Message Input**: Text input fields auto-resize based on content length, enhancing the UX for lengthy messages.
- **Error Handling and Reconnect Mechanism**: Automatic handling of WebSocket connection issues to ensure users can reconnect smoothly.

---

## Project Architecture

This chat application is structured into **modular components** to separate concerns and improve code maintainability:

- **Backend (Go)**: Manages WebSocket connections, user sessions, room creation, and real-time data handling.
- **Frontend (Next.js)**: Provides an interactive UI with **React hooks** for managing component state and **Context API** for WebSocket connection sharing.
- **WebSocket Layer**: Handles message delivery between clients and the server, and ensures real-time syncing of message history and active users.

---

## Tech Stack

| Technology       | Purpose                                                      |
|------------------|--------------------------------------------------------------|
| **Next.js**      | Frontend framework for building interactive UI with React    |
| **TypeScript**   | Provides type safety and improved code maintainability       |
| **Go** (Golang)  | Backend language for fast, concurrent WebSocket handling     |
| **WebSockets**   | Protocol for low-latency, real-time message transmission     |
| **Gin**          | Go web framework for HTTP routing and API handling           |
| **JWT**          | Authentication mechanism to secure user sessions             |

---

## Installation and Setup

### Prerequisites

- **Node.js** and **npm**
- **Go** (Golang) for backend
- **MongoDB** or other databases for user data (optional but recommended)
  
### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chat-app.git
    cd chat-app
    ```

2. **Install frontend dependencies**:
    ```bash
    cd client
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    cd ../server
    go mod tidy
    ```

4. **Environment Variables**: Create `.env` files for both frontend and backend.

   - **Frontend** (`client/.env`):
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8080
     NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080
     ```

   - **Backend** (`server/.env`):
     ```
     PORT=8080
     JWT_SECRET=your_jwt_secret
     ```

5. **Run Backend**:
    ```bash
    go run main.go
    ```

6. **Run Frontend**:
    ```bash
    cd client
    npm run dev
    ```

7. **Access the App**: Navigate to `http://localhost:3000`.

---

## Usage

### Chat Interface

Once logged in, users can join or create chat rooms. Each user can see a list of current users in the room and instantly receive any messages sent within the room.

### Sending Messages

1. Type your message in the auto-resizing input field.
2. Click 'Send' to broadcast the message to the room.
3. Messages are parsed to differentiate between **self** and **recv** messages for clear user identification.

### Room Management

- **Creating a Room**: Users can create new chat rooms and receive a unique URL to share with others.
- **Joining a Room**: Users can join an existing room via URL, connecting instantly to all other users in the room.

---

## Future Enhancements

- **Persistent Message Storage**: Save messages to a database to enable message history retrieval.
- **Typing Indicators**: Real-time indicators to show when users are typing.
- **Direct Messaging**: Allow users to send private messages within the same application.
- **Message Reactions**: Add emoji reactions for a richer chat experience.
