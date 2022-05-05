require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const authRoute = require("./Routes/rest");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true,}));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    next();
});

app.use("/api/rest", authRoute);

app.listen(3001,function(){
    console.log("Server is running on port 3001.");
  });