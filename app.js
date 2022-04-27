const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config()
require('./config/db')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '/public')))


//routes
// app.use('/', require('./routes'))


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is ready to listen on ${port}`);
})



