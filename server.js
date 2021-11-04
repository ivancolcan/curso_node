const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const socketController = require("./socketController");
const SIO = require("socket.io");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = createServer(this.app);
        this.io = SIO(this.server);

        this.users = [];

        this.middlewares();

        this.sockets();

    }


    middlewares() {
        this.app.use(cors());

        this.app.use(
            express.static("web")
        );
    }


    sockets() {
        this.io.on("connection", socketController(this));


        setTimeout(() => {
            this.io.emit("reload", "Tiempo...");
        }, 1e3);



    }

    emitUsers() {
        this.io.emit("users", this.users);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`El servidor está corriendo en el puerto ${this.port}`);
        })
    }




}



module.exports = Server;


