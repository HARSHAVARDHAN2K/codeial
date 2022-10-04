const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expresslayouts = require('express-ejs-layouts');

app.use(express.urlencoded());

app.use(cookieParser());

//code used to connect the congo db to the project
const db = require('./config/mongoose');

//to connect all static files like css and js images 
app.use(express.static('./assets'));

//using layouts this make the layout.ejs as common for 
//every web page
app.use(expresslayouts);
//extract style and sripts from sub pages into the layout
app.set('layout extractStyles', true );
app.set('layout extractScripts', true );


//use express (Middle ware)
//used to access the all the action in index files
app.use('/',require('./routes/index'));

//Setting up the view Engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${port}`);
    }

    console.log(`server is running on port : ${port}`);
});