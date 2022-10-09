const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expresslayouts = require("express-ejs-layouts");

//urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded());

//cookie-parser is a middleware which parses cookies attached to the client request object. To use it, we will require it in our index. js file;
app.use(cookieParser());

//code used to connect the mongo db to the project
const db = require("./config/mongoose");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//to connect all static files like css and js images
app.use(express.static("./assets"));

//using layouts this make the layout.ejs as common for
//every web page
app.use(expresslayouts);
//extract style and sripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

const MongoStore = require("connect-mongo")(session);

//
const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

//Setting up the view Engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store used to store the session cookie in mongodb
app.use(
  session({
    name: "codeial",
    //TODO change the secrete before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express (Middle ware)
//used to access the all the action in index files
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${port}`);
  }

  console.log(`server is running on port : ${port}`);
});
