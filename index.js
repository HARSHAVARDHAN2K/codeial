const express = require('express');
const app = express();
const port = 8000;

//use express (Middle ware)
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});