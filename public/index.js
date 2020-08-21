// const { listen } = require("socket.io");

var socket = io();

var form = document.getElementById("chat-form");
var chatMessages = document.querySelector(".chat-messages");
var roomName = document.getElementById("room-name");
var usersDisplay = document.getElementById("users");

console.log(window.location);
const {username,room } = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

roomName.innerHTML = room;

socket.emit("join-room",{username,room});

// socket.emit("disconnect",{username,room})

socket.on("users",users=>{
    outputUsers(users);
})


socket.on("allUsers",({username})=>{
    var li =document.createElement("li");
     li.innerHTML =`${username}`
    usersDisplay.appendChild(li);      
})
socket.on("message",msg=>{
    console.log(msg);
    outputMessage(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


form.addEventListener("submit",e=>{
    e.preventDefault();
    var input = document.getElementById("msg");
    const {username,room } = Qs.parse(location.search,{
        ignoreQueryPrefix:true
    })
    var msg = document.getElementById("msg").value;
    socket.emit("chat-message",{username,room,msg});
    input.value = ''
    input.focus();
   })



   function outputMessage(msg){
      var div =  document.createElement("div");
      div.classList.add("message");
      div.innerHTML =`	<p class="meta">${msg.userName} <span>${msg.time}</span></p>
      <p class="text">
          ${msg.text}
      </p>`;

      console.log(div);
    //   console.log(document.querySelector(".chat-container .chat-message"))
      document.querySelector(".chat-container .chat-messages").appendChild(div)
   }


   function outputUsers(users)
   {
       console.log(typeof users);
//        console.log(users);
//        for(var i=0;i<users.length;i++)
//        {
// var li =document.createElement("li");
// li.innerHTML =`${users[i].username}`
// usersDisplay.appendChild(li);

//        }
usersDisplay.innerHTML = `${users.map(user=>`<li>${user.username}</li>`).join("")}`;
   }