const users =[]



// join user chat
 function joinUser(id,username,room){
   
    const user = {id,username,room}
     

//    console.log('user :>> ', user);
   users.push(user)

   return user;
}

// get current user

function getCurrentUserName(id){
    return users.find(user=>user.id === id)
}


// user leave chat

function userLeaveName(id){
    const index = users.findIndex(user=>user.id === id)
    console.log('index :>> ', index);

    if(index !== -1){
        //  console.log('user :>> ', users.splice(index,1)[0]);
        return users.splice(index, 1)[0]
    }
   
}

// get room user

function getRoomName(room){
    return users.filter(user=>user.room===room)
}



module.exports ={
   joinUser,
   getCurrentUserName,
   userLeaveName,
   getRoomName
}