const { Socket } = require('socket.io');


/**
 * @param {Socket} socket 
 */
const socketController = (parent) => (socket) => {

    console.log("Cliente conectado", socket.id);

    socket.emit("tu-id", socket.id);

    parent.users.push(socket.id);

    parent.emitUsers();

    socket.on("user-updated", (user) => {
        const { id, name } = user;

        parent.users = parent.users.map(u => {
            if (u === id) return name;
            return u;
        });

        parent.emitUsers();
    });

    socket.on("disconnect", () => {
        console.log("cliente desconectado", socket.id);
        parent.users = parent.users.filter(user => user !== socket.id);
        parent.emitUsers();
    });

    socket.on("mensaje", (payload, callback) => {
        console.log(payload);

        const { message, selectedUsers } = payload;


        if (selectedUsers.length) {
            for (const id of selectedUsers) {
                socket.to(id).emit("global-message", message);
                callback(`to ${id}:<br>${message}`);
            }
            return;
        }


        socket.broadcast.emit("global-message", message);
        callback("callback: " + message);


    });



};




module.exports = socketController;