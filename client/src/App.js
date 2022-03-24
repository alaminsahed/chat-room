
import './App.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


//connect with backend
const socket = io.connect("http://localhost:5005")
//console.log(socket);

const useStyles = makeStyles({
  card: {
    width: "40rem",
    marginLeft: "auto",
    marginRight: "auto"
  },
  input: {
    padding: '3px',
    width: "80%",
    margin: '2rem'
  },
  btn: {

  }

});



function App() {
  const [message, setMessage] = useState(" ");
  const [receiveMessage, setReceiveMessage] = useState(" ")
  const [room, setRoom] = useState("");
  const classes = useStyles();


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
      <Card className={classes.card}>
        <CardContent>
          <input
            placeholder="Room Number..."
            className={classes.input}
            onChange={(event) => {
              setRoom(event.target.value);

            }} required />
          <br />
          <Button onClick={joinRoom} variant="contained"> Join Room</Button>
          <br />
          <input type="text" className={classes.input} placeholder="Type your message" onChange={(e) => setMessage(e.target.value)} />
          <br />
          <Button onClick={sendMessage} disabled={!room} variant="contained">send</Button>
          <div sx={{ marginTop: '2rem' }}>
            <h1>Message</h1>
            <p> {receiveMessage}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
