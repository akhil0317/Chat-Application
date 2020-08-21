const express = require("express");
const formatMessage = require("./utils/messages")
const {
    userJoin,
    getCurrentUser,
    disconnect,
    getUsersOfRoom,
    disconnectedUser
} = require("./utils/user")
const path = require("path");
const socketio = require("socket.io");
const app = express();
app.use(express.static(path.join(__dirname,"public")))
var port = 8080 ||process.env.PORT
var server = app.listen(port,()=>{
    console.log("server running");
})
const io = socketio(server);



//runs when client connect
io.on("connection",socket=>{
             
  
    socket.on("join-room",({username,room})=>{
        const user = userJoin(socket.id,username,room)
        console.log(user);
        socket.join(user.room)
        //send welcome message to connected client
socket.emit("message",formatMessage("message",`${user.username} welcome to chat-app!!!!`))

//broadcast when user connects
 socket.broadcast.to(user.room).emit("message",formatMessage(`${user.username}`,` ${user.username} joined the chat` ));


 socket.emit("users",getUsersOfRoom(user.room))

 socket.broadcast.to(user.room).emit("allUsers",{username:user.username})

 //send chat message to all connected sockets
socket.on("chat-message",({username,room,msg})=>{
    
    io.to(user.room).emit("message",formatMessage(`${username}`,msg));
})

//runs when  client disconnect
socket.on("disconnect",()=>{
    
    io.to(user.room).emit('message',disconnect(socket.id));
    io.to(user.room).emit("users",disconnectedUser(user.room))
   
})



    })






 


})





