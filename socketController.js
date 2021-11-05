const { Socket } = require('socket.io');


/**
 * @param {Socket} socket 
 */
const socketController = (parent) => (socket) => {

    console.log("Cliente conectado", socket.id);

    socket.emit("tu-id", socket.id);

    parent.users.push({id:socket.id, name:socket.id});

    parent.emitUsers();



    socket.on("disconnect", () => {
        console.log("cliente desconectado", socket.id);
        parent.users = parent.users.filter(user => user.id !== socket.id);
        parent.emitUsers();
    });

    socket.on("mensaje", (payload, callback) => {
        console.log(payload);

        const { message, selectedUsers } = payload;
        const userFrom = parent.users.filter(user => user.id === socket.id)[0];

        if (selectedUsers.length) {
            let names = [];
            for (const u of selectedUsers) {
                socket.to(u.id).emit("global-message", "<span class='text-primary'>"+userFrom.name+":</span> <br>"+message);
                names.push(u.name);
            }
            callback(`<span class='text-success'>Para ${names.join(", ")}:</span> <br>${message}`);
            return;
        }


        socket.broadcast.emit("global-message", "<span class='text-primary'>"+userFrom.name+":</span> <br>"+message);
        callback("<span class='text-success'>Yo:</span> <br>" + message);


    });

    socket.on("username", (payload) => {
        console.log(payload);

        const { name } = payload;

        //parent.users.filter(user => user.id === socket.id)[0].name = name;

        parent.users.map(u => {
            if (u.id === socket.id) {
                u.name = name;
            }
        });

        parent.emitUsers();


    });


};




module.exports = socketController;