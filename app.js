const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '/public')))


//routes
app.use('/', require('./routes'))

//set port, listen for requests
const port = process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`Server connected and port no ${port}`);
})



