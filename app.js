const express = require('express');
const config = require('./config');
const phoneBookRoute = require('./route/phonebook');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded(true))
app.use(config.ROUTES.PHONEBOOK.PRIMARY, phoneBookRoute);
app.listen(process.env.PORT||1234, ()=>{
    console.log("Server Started");
})