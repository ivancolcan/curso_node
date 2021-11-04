window.addEventListener('DOMContentLoaded', (event) => {

    const socket = io();
    const sendButton = document.querySelector(".user-box button.send");
    const aliasButton = document.querySelector(".user-box button.alias");
    const message = document.querySelector(".user-box textarea");
    const globalChat = document.querySelector(".global-chat");
    const userList = document.querySelector(".users");
    const me = document.querySelector("#me");
    const username = document.querySelector("#usuario");
    const user = {
        id: "",
        name: ""
    };

    let selectedUsers = [];


    const updateUserName = (name) => {
        if (!name) name = username.value;
        user.name = name;
        me.innerHTML = name;
        if (username.value !== name) username.value = name;
        socket.emit("user-updated", user);
    };

    aliasButton.addEventListener("click", () => {
        const name = username.value;
        updateUserName(name);
    });


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






    socket.on("connect", () => {
        console.log("Cliente conectado");
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });

    socket.on("tu-id", (id) => {
        console.log("saludo:", id);
        user.id = id;

        if (user.name === "") updateUserName(id);

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





