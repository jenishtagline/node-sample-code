 const socket = io();
        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const messages = document.getElementById('messages');
        const user = document.getElementById('user');
        const test = document.getElementById('test')
       
       
       

      //   socket.emit('chatMessage','room1')


      //   form.addEventListener('submit', function(e) {
      //    e.preventDefault();
      //    if(user.value && input.value) {
      //        user.disabled = true;
      //       //  socket.emit('roomMessage',room.value)
      //         socket.emit('chatMessage',user.value + ' : ' + input.value);
      //       input.value = '';
            
      //   }
      //   });
      // socket.on('chatMessage',(message)=>{
      //       const item = document.createElement('li');
      //       item.textContent =message;
      //       messages.appendChild(item)
      //       window.scrollTo(0,document.body.scrollHeight)
      //   })

      // socket.on('roomMessage',(roomname)=>{
      //   docuemnt.getElementById('test').innerHTML = roomname;
      // })
       
        

      //---------------------------------------------------------------- 

        socket.on('connect',()=>{
          console.log(socket.id);
        })
        
        socket.emit('create','room1')
        socket.emit('chatMessage','You are join room1' )

        socket.on('chatMessage',(message)=>{
                const item = document.createElement('li');
                item.textContent =message;
                messages.appendChild(item)
                window.scrollTo(0,document.body.scrollHeight)
            })











        // function roomname(){
        //   const room = document.getElementById('room')
        //   if(room.value){
        //     room.disabled = true;
        //     socket.emit('chatMessage',"You are join room in " + room.value)
        //   }
        // }
       

        //   form.addEventListener('submit', function(e) {
        //  e.preventDefault();
        //  if(user.value && input.value) {
        //      user.disabled = true;
        //       socket.emit('chatMessage',user.value + ' : ' + input.value);
        //     input.value = '';
            
        // }
        // });
      
        // socket.on('chatMessage',(message)=>{
        //         const item = document.createElement('li');
        //         item.textContent =message;
        //         messages.appendChild(item)
        //         window.scrollTo(0,document.body.scrollHeight)
        //     })

        //     socket.on('connectToRoom',function(data){
        //       console.log(data);
            
        //    });

       
     