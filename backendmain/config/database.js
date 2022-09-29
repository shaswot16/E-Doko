const mongoose= require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'./config/config.env'});
const DB= process.env.DATABASE;

console.log(DB);

const connectDatabase=()=>{
    
    mongoose.connect(DB).then(()=>{
            console.log(`connection succesfull`);
        }).catch((err)=> console.log(`no the connection was not successful`));

};

module.exports =connectDatabase;