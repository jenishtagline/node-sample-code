const chatForm = document.getElementById('form')
const roomName = document.getElementById('test')

const socket = io()


const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})
socket.emit('joinRoom',{username,room})


socket.on('message',message=>{
    getMessage(message);
    console.log('message :>> ', message);
})


chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const message = e.target.elements.input.value;
    socket.emit('chatMessage',message)
    e.target.elements.input.value = ''
})

function getMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
 
}


//-----------------------------------------------------------------------------------------------


// 1 to 1 chat code 




// const chatForm = document.getElementById('form')
// const roomName = document.getElementById('test')

// const socket = io()


// const {username,username1} = Qs.parse(location.search,{
//     ignoreQueryPrefix: true
// })

// let room;
// if(username > username1) {
//  room = username + '_' + username1;
// }else{
//     room = username1 + '_' + username
// }
// console.log('room :>> ', room);



//    socket.emit('joinRoom',{username,username1,room})



// socket.on('message',message=>{
//     getMessage(message);
//     console.log('message :>> ', message);
// })


// chatForm.addEventListener('submit',(e)=>{
//     e.preventDefault()

//     const message = e.target.elements.input.value;
//     socket.emit('chatMessage',message)
//     e.target.elements.input.value = ''
// })

// function getMessage(message){
//     const div = document.createElement('div')
//     div.classList.add('message')
//     div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
//     <p class="text">
//     ${message.text}
//     </p>`;
//   document.querySelector(".chat-messages").appendChild(div);
 
// }
