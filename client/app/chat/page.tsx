"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { WebsocketContext } from "../modules/websocket_provider";
import { useRouter } from "next/navigation";
import { API_URL } from "../constants";
import autosize from "autosize";
import { AuthContext } from "../modules/auth_provider";

export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: "recv" | "self";
};

const Page = () => {
  const [messages, setMessage] = useState<Array<Message>>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const { conn } = useContext(WebsocketContext);
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (conn === null) {
      router.push("/");
      return;
    }

    const roomId = conn.url.split("/")[5];
    async function getUsers() {
      try {
        const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    if (textarea.current) {
      autosize(textarea.current);
    }

    if (conn === null) {
      router.push("/");
      return;
    }

    conn.onmessage = (message) => {
      const m: Message = JSON.parse(message.data);
      if (m.content === "A new user has joined the room") {
        setUsers([...users, { username: m.username }]);
      }

      if (m.content === "user left the chat") {
        const deleteUser = users.filter((user) => user.username !== m.username);
        setUsers([...deleteUser]);
        setMessage([...messages, m]);
        return;
      }

      user?.username === m.username ? (m.type = "self") : (m.type = "recv");
      setMessage([...messages, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};

    conn.onopen = () => {};
  }, [textarea, messages, conn, users]);

  const sendMessage = () => {
    if (!textarea.current?.value) return;
    if (conn === null) {
      router.push("/");
      return;
    }

    conn.send(textarea.current.value);
    textarea.current.value = "";
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#f9fafb] text-[#333333]">
      {/* Header */}
      <div className="flex justify-between p-6 bg-[#ffffff] shadow-md rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-semibold text-[#3c3c3c]">{user?.username}</div>
          <div className="text-sm text-[#777777]">{users.length} online</div>
        </div>
        <button className="bg-[#c37059] text-white py-2 px-5 rounded-md hover:bg-red-500 transition-all duration-200">
          Leave Room
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-grow p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${
              msg.type === "self" ? "bg-[#e3baaf] text-[#333333] ml-auto" : "bg-[#d4e1e4] text-[#333333] mr-auto"
            } max-w-md`}
            style={{
              marginBottom: "16px",
              lineHeight: "1.6",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="font-semibold text-md">{msg.username}</div>
            <div className="text-lg">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Message Input Section */}
      <div className="fixed bottom-0 w-full p-4 bg-[#ffffff] rounded-t-lg shadow-xl">
        <div className="flex items-center p-4 rounded-lg mx-6 space-x-4">
          <div className="w-full">
            <textarea
              ref={textarea}
              placeholder="Type a message..."
              className="w-full p-4 text-[#333333] bg-[#f4f4f4] rounded-lg border-2 border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-[#3f9bbf] resize-none transition-all duration-200"
              style={{ minHeight: "60px", fontSize: "16px" }}
            />
          </div>
          <button
            className="p-4 bg-[#e3baaf] text-white rounded-full shadow-lg hover:bg-[#388e3c] focus:ring-2 focus:ring-[#66bb6a] transform transition-all duration-200 hover:scale-105"
            onClick={sendMessage}
          >
            <span className="text-lg font-semibold">Send</span>
          </button>
        </div>
      </div>

      {/* Loading Indicator (Optional) */}
      {messages.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#333333]">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Page;
