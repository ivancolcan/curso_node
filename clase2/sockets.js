import express from "express";
import http from "http";
import soketio from "socket.io";


const app = express();
const server = http.createServer(app);
const io = soketio(server);



io.on("connection", (socket) => {

    // setInterval(() => {
    //     socket
    // },3e3);
    

});


server.listen(3000);
