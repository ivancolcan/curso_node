window.addEventListener('DOMContentLoaded', (event) => {

    const sendButton = document.querySelector(".user-box button");
    const message = document.querySelector(".user-box textarea");
    const globalChat = document.querySelector(".global-chat");
    const userList = document.querySelector(".users");
    const me = document.querySelector("#me");
    const user = {
        id: ""
    };

    let selectedUsers = [];


    const agregarMensajeGlobal = (msg) => {
        const div = document.createElement("div");
        div.innerHTML = msg;
        globalChat.appendChild(div);
        div.scrollIntoView();
    };

    const agregarUsuario = (name) => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.innerHTML = name.slice(0, 8);
        userList.appendChild(div);

        const user = {
            selected: false,
            id: name
        };

        div.addEventListener("click", () => {
            if (user.selected) {
                div.classList.remove("selected");
                selectedUsers = selectedUsers.filter(id => id !== user.id);
            } else {
                div.classList.add("selected");
                selectedUsers.push(user.id);
            }
            user.selected = !user.selected;
        });

    };



    const socket = io();

    socket.on("connect", () => {
        console.log("Cliente conectado");
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    socket.on("tu-id", (id) => {
        console.log("saludo:", id);
        user.id = id;
        me.innerHTML = id;
    });

    // socket.on("reload", location.reload());

    socket.on("global-message", (msg) => {
        agregarMensajeGlobal(msg);
    });

    socket.on("users", (users) => {
        userList.innerHTML = "";
        for (const user of users) {
            agregarUsuario(user);
        }
    });


    sendButton.addEventListener("click", () => {


        const payload = {
            message: message.value,
            selectedUsers
        };


        socket.emit("mensaje", payload, (res) => {
            agregarMensajeGlobal(res);
        });


    });










});





