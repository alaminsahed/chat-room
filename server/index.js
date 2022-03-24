const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors')
const dotenv = require('dotenv')
const { Server } = require('socket.io');




dotenv.config()

app.use(cors());
app.use(express.json())

//server create 
//socket demands http server create
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

//event name must be same in client and server.
// data flow: client->server->another client

io.on("connection", (socket) => {
    console.log(`id:${socket.id}`);
    //console.log(socket); // gives an error. 
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        console.log("b", data);
        socket.to(data.room).emit("receive_message", data)
    })
});




server.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})