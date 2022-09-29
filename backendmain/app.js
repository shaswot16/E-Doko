const express = require("express");
const app = express();
app.use(express.json());

//Route Imports
const product = require("./routes/productRoute");

//Connecting to database
require('./config/database');

//Middleware For Error

const errorMiddleware = require('./middleware/error');

app.use("/api/v1",product);

app.use(errorMiddleware);


module.exports =app;