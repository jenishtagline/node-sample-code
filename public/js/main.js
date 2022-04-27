const socket = io();

socket.on("message", (message) => {
   showMessage(message);
});
socket.on("joinUsers", (users) => {
  currentUsers(users);
  console.log("users :>> ", users);
});

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

document.getElementById("users").innerHTML = username;
document.getElementById("room-name").innerHTML = room;

 socket.emit("joinRoom", { username, room });
 

const chartForm = document.getElementById("chat-form");

chartForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = event.target.elements.msg.value;
  console.log(message);
  socket.emit("chatBoard", message);
  
});

const showMessage = (message) => {
    console.log(message);
    const div = document.createElement("div");
   div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.message}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
  console.log('message :>> ', message);
};

const currentUsers = (users) => {
  const old = document.getElementById("users").innerHTML;
  let li = document.createElement("li");
  const parentUi = li.parentNode;

  for (let user of users) {
    li.innerText = user.username;
  }
 
  parentUi.replaceChild(old, li);
  // }
};





















//----------------------------------------------

// socket.on('message', (message) => {
//     console.log(message);
//     showMessage(message);

// })
// socket.on('joinUsers', (users) => {
//     currentUsers(users);
//     console.log('users :>> ', users);
// })

// const { username, room } = Qs.parse(location.search, {
//     ignoreQueryPrefix: true
// })

// console.log('location.search :>> ', location.search);
// console.log('username :>> ', username);
// console.log('room :>> ', room);

//     socket.emit('joinRoom', { username, room })

// const chartForm = document.getElementById('chat-form');

// chartForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const message= event.target.elements.msg.value;
//     console.log(message);
//     socket.emit('chatBoard', message);

// })

// const showMessage = (message) => {
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
//     <p class="text">
//     ${message.message}
//     </p>`;
//     document.querySelector('.chat-messages').appendChild(div);
//     console.log('message :>> ', message);
//     console.log('message.username :>> ', message.username);
//     console.log('message.time :>> ', message.time);
//     console.log('message.message :>> ', message.message);
// }
// const currentUsers = (users) => {
//     const old = document.getElementById('users').innerHTML;
//     let li = document.createElement('li');
//     const parentUi = li.parentNode;
//     for(let user of users) {
//         li.innerText = user.username;
//     }

//     parentUi.replaceChild(old,li);
//     // }
// }

//--------------------------------------------------------



