import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:5005")
console.log(socket);


function App() {
  const [message, setMessage] = useState(" ");
  const [receiveMessage, setReceiveMessage] = useState(" ")
  console.log(receiveMessage);

  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceiveMessage(data.message)
    });
  }, [socket])



  return (
    <div className="App">
      <h1>client is ruuning</h1>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>send</button>
      <div>
        {receiveMessage}
      </div>
    </div>
  );
}

export default App;
