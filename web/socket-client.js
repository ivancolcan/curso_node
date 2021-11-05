window.addEventListener('DOMContentLoaded', (event) => {

    const btEnviarNombreUsuario = document.querySelector("#btEnviarNombreUsuario");
    const usuario = document.querySelector("#usuario");
    const divNombreUsuario = document.querySelector("#divNombreUsuario");

    const divChat = document.querySelector("#divChat");
    const sendButton = document.querySelector("#btEnviarMensaje");
    const message = document.querySelector("#mensaje");
    const globalChat = document.querySelector(".global-chat");
    const userList = document.querySelector(".users");
    const me = document.querySelector("#me");
    const usuariosConectados = document.querySelector("#usuariosConectados");
    const btCambiarNombreUsuario = document.querySelector("#btCambiarNombreUsuario");
    const user = {
        id: "",
        name:""
    };

    let selectedUsers = [];


    const agregarMensajeGlobal = (msg) => {
        const div = document.createElement("div");
        div.innerHTML = msg;
        globalChat.appendChild(div);
        div.scrollIntoView();
    };

    const agregarUsuario = (usuario) => {
        const div = document.createElement("div");
        div.classList.add("user");
        div.innerHTML = usuario.name;
        userList.appendChild(div);

        const userSelected = {
            selected: false,
            id: usuario.id,
            name: usuario.name
        };

        div.addEventListener("click", () => {
            if (userSelected.selected) {
                div.classList.remove("selected");
                selectedUsers = selectedUsers.filter(u => u.id !== userSelected.id);
            } else {
                div.classList.add("selected");
                selectedUsers.push(userSelected);
            }
            userSelected.selected = !userSelected.selected;
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
        //me.innerHTML = id;
    });

    // socket.on("reload", location.reload());

    socket.on("global-message", (msg) => {
        agregarMensajeGlobal(msg);
    });

    socket.on("users", (users) => {
        userList.innerHTML = "";
        usuariosConectados.innerHTML = users.length-1;
        for (const u of users) {
            if (u.id !== user.id) {
                agregarUsuario(u);
            }
        }
    });


    sendButton.addEventListener("click", () => {


        const payload = {
            message: message.value,
            selectedUsers
        };

        message.value = "";
        socket.emit("mensaje", payload, (res) => {
            agregarMensajeGlobal(res);
        });


    });

    btEnviarNombreUsuario.addEventListener("click", () => {


        const payload = {
            name: usuario.value
        };

        socket.emit("username", payload);

        me.innerHTML = usuario.value;

        divNombreUsuario.style.display = "none";
        divChat.style.display = "block";

    });

    btCambiarNombreUsuario.addEventListener("click", () => {

        divNombreUsuario.style.display = "block";
        divChat.style.display = "none";

    });



});





