// "use client";

// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "./modules/auth_provider";
// import { API_URL } from "./constants";
// import { v4 as uuidv4 } from "uuid";
// import { WEBSOCKET_URL } from "./constants";
// import { WebsocketContext } from "./modules/websocket_provider";
// import { useRouter } from "next/navigation";
// import { FaPlusCircle, FaRocketchat } from "react-icons/fa"; // Icons for fun

// const Page = () => {
//   const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
//   const [roomName, setRoomName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { user } = useContext(AuthContext);
//   const { setConn } = useContext(WebsocketContext);
//   const router = useRouter();

//   const getRooms = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API_URL}/ws/getRooms`, {
//         method: "GET",
//       });
//       if (!res.ok) throw new Error("Failed to fetch rooms");
//       const data = await res.json();
//       setRooms(data);
//     } catch (err) {
//       console.error(err);
//       // setError("Unable to load rooms. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getRooms();
//   }, []);

//   const submitHandler = async (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     if (!roomName.trim()) return;

//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API_URL}/ws/createRoom`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           id: uuidv4(),
//           name: roomName,
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to create room");
//       setRoomName("");
//       getRooms();
//     } catch (err) {
//       console.error(err);
//       setError("Room creation failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const joinRoom = (roomId: string) => {
//     const ws = new WebSocket(
//       `${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`
//     );
//     ws.onopen = () => {
//       setConn(ws);
//       router.push("/chat");
//     };
//     ws.onerror = () => {
//       console.error("Failed to connect to WebSocket");
//       setError("Unable to join room. Please try again.");
//     };
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center px-8 py-16">
//       <div className="w-full h-full max-w-4xl bg-white rounded-xl shadow-2xl p-10 flex flex-col">
//         <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
//           Manage your chat rooms here!{" "}
//           <FaRocketchat className="inline-block ml-2 text-indigo-600" />
//         </h1>

//         {/* Create Room Section */}
//         <form
//           className="flex flex-col sm:flex-row items-center gap-6 mb-10"
//           onSubmit={submitHandler}
//         >
//           <input
//             type="text"
//             className="flex-1 p-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="Enter a new room name"
//             value={roomName}
//             onChange={(e) => setRoomName(e.target.value)}
//           />
//         <button
//   type="submit"
//   className="bg-[#C85A38] text-white hover:bg-[#333333] font-semibold py-4 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
// >
//   <FaPlusCircle className="inline-block mr-2" /> Create Room
// </button>

//         </form>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         {/* Available Rooms Section */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//             Available Rooms
//           </h2>
//           {loading ? (
//             <div className="flex justify-center">
//               <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
//             </div>
//           ) : rooms.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {rooms.map((room, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg p-6 border-t-4 border-indigo-600 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
//                 >
//                   <div className="mb-4">
//                     <h3 className="text-xl font-bold text-gray-800">
//                       {room.name}
//                     </h3>
//                     <p className="text-gray-500 text-sm">Room ID: {room.id}</p>
//                   </div>
//                   <button
//                     className="mt-6 bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition duration-200"
//                     onClick={() => joinRoom(room.id)}
//                   >
//                     Join Room
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center">
//               No rooms available. Create one to get started!
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./modules/auth_provider";
import { API_URL, WEBSOCKET_URL } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { WebsocketContext } from "./modules/websocket_provider";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaRocketchat } from "react-icons/fa";

const ChatRoomPage = () => {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { setConn } = useContext(WebsocketContext);
  const router = useRouter();

  // Fetch rooms from the server
  const getRooms = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/ws/getRooms`, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load rooms. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  // Handler for creating a new room
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/ws/createRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: uuidv4(),
          name: roomName,
        }),
      });

      if (!res.ok) throw new Error("Failed to create room");
      setRoomName("");
      getRooms();
    } catch (err) {
      console.error(err);
      setError("Room creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for joining a room
  const joinRoom = (roomId: string) => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    const ws = new WebSocket(
      `${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`
    );

    ws.onopen = () => {
      setConn(ws);
      router.push("/chat");
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setError("Unable to join room. Please try again.");
    };
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-10 flex flex-col">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Manage your chat rooms here!{" "}
          <FaRocketchat className="inline-block ml-2 text-indigo-600" />
        </h1>

        {/* Create Room Section */}
        <form
          className="flex flex-col sm:flex-row items-center gap-6 mb-10"
          onSubmit={submitHandler}
        >
          <input
            type="text"
            className="flex-1 p-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter a new room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#dfa898] text-white hover:bg-[#333333] font-semibold py-4 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <FaPlusCircle className="inline-block mr-2" /> Create Room
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Available Rooms Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Rooms
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin"></div>
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-gray-50 rounded-lg p-6 border-t-4 border-indigo-600 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                  {/* <p className="text-gray-500 text-sm">Room ID: {room.id}</p> */}
                  <button
                    className="mt-6 bg-[#dfa898] hover:bg-gray-800 text-white py-2 px-3 rounded-lg transition duration-200"
                    onClick={() => joinRoom(room.id)}
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No rooms available. Create one to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;


