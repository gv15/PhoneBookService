const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
require("dotenv").config();
mongoose.plugin(uniqueValidator);

mongoose.connect(process.env.DBURL,
    {
     useNewUrlParser:true,
     useUnifiedTopology: true,
     poolSize:process.env.POOLSIZE
    }
     ,(err)=>{
        if(err){
            console.log("error in db connection", err);
            process.exit();
        }
        else{
            console.log("Connection db sucess");
        }
});

module.exports = mongoose;
