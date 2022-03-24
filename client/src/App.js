import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';


//connect with backend
const socket = io.connect("http://localhost:5005")
//console.log(socket);


function App() {
  const [message, setMessage] = useState(" ");
  const [receiveMessage, setReceiveMessage] = useState(" ")
  const [room, setRoom] = useState("");

  // console.log(receiveMessage);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };


  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage(data.message)
    });
  }, [socket])



  return (
    <div className="App">
      <h1>Chat with friends</h1>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }} />
      <button onClick={joinRoom}> Join Room</button>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send</button>
      <div>
        {receiveMessage}
      </div>
    </div>
  );
}

export default App;
