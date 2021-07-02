const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: "*",
    }
  });

io.on("connection", (socket) =>{
    console.log("socket: ", socket);
    console.log("socket is active");

    socket.on("chat",(payload) =>{
        console.log("payload: ",payload);
        io.emit("chat",payload);
    });
});

//app.listen(5000, () => console.log("Connected"));

server.listen(5000, () => console.log("server is listening at 5000..."));