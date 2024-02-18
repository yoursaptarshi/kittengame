const express = require('express')
const cookieparser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRoutes')
const fileUpload =require("express-fileupload") ;

const app = express();
app.use(cors());
//dotenv.config({path:"./config/config.env"});

//middlewares

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
      useTempFiles: true,
    })
  );


//routes
app.use("/api/v1",userRouter)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports = app;
