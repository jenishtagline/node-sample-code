const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userName = document.getElementById('users')

const socket = io()


const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
socket.emit('joinRoom',{username,room})



socket.on('message',(message) => {
    outputMessage(message)

    chatMessage.scrollTop = chatMessage.scrollHeight
})


chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const message = e.target.elements.msg.value

    // emit message to server
    socket.emit('chatMessage', message);

    e.target.elements.msg.value = '';
})

// output message DOM

function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text">
  ${message.text}
  </p>`;
document.querySelector(".chat-messages").appendChild(div);
console.log('message :>> ', message);
}


// message for server

socket.on('roomUsers',({room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})


// add roomName

function outputRoomName(room){
    roomName.innerText = room
}

function outputUsers(users){
    userName.innerHTML = ` ${users.map(user=>`<li>${user.username}</li>`).join('')}`;
    
}