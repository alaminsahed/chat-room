const express = require('express');
const app = express();
const http = require("http");
const cors = require('cors')
const dotenv = require('dotenv')
const { Server } = require('socket.io');




dotenv.config()

app.use(cors());
app.use(express.json())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`id:${socket.id}`);
    //console.log(socket); // gives an error. 
    socket.on("send_message", (data) => {
        console.log("b", data);
        socket.broadcast.emit(data)
    })
});




server.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})