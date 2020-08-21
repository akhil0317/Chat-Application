const users = [];
const moment = require("moment");

function userJoin(id,username,room)
{
    const user = {
        id,
        username,
        room
    }
    users.push(user);
    
    return user;
}


function getCurrentUser(id){
    return users.find((user)=>user.id===id);
}


function disconnect(id)
{
    
    var index = users.findIndex(user=>user.id===id)
    var returnItem = {
       userName: "message" ,
       time: moment().format("h:mm a"),
       text :`${users[index].username} has left the chat`
    }

    users.splice(index,1);
    return returnItem;
}

function disconnectedUser(room)
{
    // console.log(users);
    //   var user = users.find((user)=>user.room===room);
    return users.filter(user=> user.room===room);

}

function getUsersOfRoom(room){
return users.filter(user=> user.room===room)

}
module.exports = {
    userJoin,
    getCurrentUser,
    disconnect,
    getUsersOfRoom,
    disconnectedUser
    
}