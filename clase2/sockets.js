import express from "express";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const sockets = [];

io.on("connection", (socket) => {

    sockets.push(socket.id);
    console.log(sockets);

    socket.emit("conectado", "ok...")

});



server.listen(3000);


app.use(express.static(join(__dirname)));

app.listen(8080);

