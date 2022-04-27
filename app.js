const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
const path = require('path');
require('./db/db')
const Schema = require('./models/user')
const formatMessage = require('./formatData/message')
const {userJoin,getCurrentUser,userLeave,getRoomUser} = require('./formatData/user')
const getUserData = require('./userData/message')
const {joinUser,getCurrentUserName,userLeaveName,getRoomName} = require('./userData/roomcreate')
const userData = require('./models/user')
const roomData = require('./models/room')
const chatData = require('./models/chat');
const { default: mongoose } = require('mongoose');
const { object } = require('joi');
const { ObjectId } = require('mongodb');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


 app.use(express.static(path.join(__dirname,'/public')))
//routes
app.use('/', require('./routes/index1'))

app.get('/socket',(req,res)=>{
     res.sendFile(__dirname + '/room.html')
   // res.render('index')
   
})



// const botName = 'ChatCord Bot'

// io.on('connection',(socket)=>{
//   console.log('socket connected');

//   socket.on('joinRoom',({username,room})=>{

//     const user = userJoin(socket.id, username, room)

//     socket.join(user.room)

//     // user connect and send message
//    socket.emit('message',formatMessage(botName,'Welcome to ChatCord!'));

//   // broadcast when user connect
//     socket.broadcast.to(user.room).emit('message',formatMessage(botName,` ${user.username} has joined the chat`));

//     //send info room and username
//     io.to(user.room).emit('roomUsers',{
//       room: user.room,
//       users:getRoomUser(user.room)
//     })
//   })

//   socket.on('chatMessage',(msg) => {
//         const user = getCurrentUser(socket.id)


//        io.to(user.room).emit('message',formatMessage(user.username,msg))
//      })

//   //user disconnect
//   socket.on('disconnect',()=>{
//     const user = userLeave(socket.id)
  

//     if(user){
//       io.to(user.room).emit('message',formatMessage(botName,` ${user.username} has left the chat`))
      
//       io.to(user.room).emit('roomUsers',{
//         room: user.room,
//         users:getRoomUser(user.username)
  
//       })
//     }

   
//   })
// })

//--------------------------------------------------------------------------------------------------------------------------------

// 1 to 1 chat code


// let boatName = "messenger";


// io.on('connection',(socket)=>{
//   console.log('socket connection');

//   socket.on('joinRoom',({username,username1,room})=>{
//     const user = joinUser(socket.id,username,username1,room)
//     console.log('user :>> ', user);
//     socket.join(user.room)

    

//     socket.emit('message',getUserData(boatName,'welcome to messenger'));
//     socket.broadcast.to(user.room).emit('message',getUserData(boatName,`${user.username} has joined the chat`))
//   })

//   socket.on('chatMessage',async(msg)=>{
//     const user = getCurrentUserName(socket.id)
//     console.log('user :>> ', user);

//     const getUser = await userData.findOne({username:user.username})
//     const getUser1 = await userData.findOne({username:user.username1})
//     console.log('getUser :>> ', getUser._id);
//     console.log('getUser1 :>> ', getUser1._id);

//     // const getData = new chatData({
//     //  sender: mongoose.Types.ObjectId(getUser._id),
//     //  receiver: mongoose.Types.ObjectId(getUser1._id),
//     //   room:getUser._id + '_' + getUser1._id,
//     //   message:msg
//     // })
//     // getData.save()

//    io.to(user.room).emit('message',getUserData(user.username,msg))
//   })

//   socket.on('disconnect',()=>{
//     const user = userLeaveName(socket.id)
   
//     if(user){
//       io.to(user.room).emit('message',getUserData(boatName,`${user.username} has left the chat`))
//     }
//   })




// })

//-----------------------------------------------------------------------------------------------------------

// group chat code 

let boatName = 'messenger';

io.on('connection',(socket)=>{
  console.log("socket connected");

  socket.on('joinRoom',({username,room})=>{
    
    const user = joinUser(socket.id,username,room);

    socket.join(user.room)
    
    socket.emit('message',getUserData(boatName,'welcome to messenger'))

     socket.broadcast.in(user.room).emit('message',getUserData(boatName,`${user.username} has joined the chat`))
   
  })

 socket.on('chatMessage',msg=>{

   const user = getCurrentUserName(socket.id)

   io.to(user.room).emit('message',getUserData(user.username,msg))
 })

 socket.on('disconnect',()=>{

   const user = userLeaveName(socket.id)

   console.log('user :>> ', user);

   if(user){
     io.to(user.room).emit('message',getUserData(boatName,`${user.username} has left the chat`))
   }
  
     
 })

})








   
//set port, listen for requests
const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`Server connected and port no ${port}`);
})





