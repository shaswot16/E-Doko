const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

//Connecting to database
require('./config/database');



//Middleware For Error

const errorMiddleware = require('./middleware/error');

app.use("/api/v1",product);
app.use("/api/v1",user);


app.use(errorMiddleware);


module.exports =app;