const moment = require('moment');



function getUserData(username,text){
   return {
     username,
     text,
     time:moment().format('hh:mm a')
   }
}

module.exports = getUserData;