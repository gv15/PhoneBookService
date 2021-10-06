const mongoose = require('mongoose');
const config = require('../../config');
const connection = require('../connect');
const {Schema} = mongoose;
const phoneBookSchema = new Schema({
    name:{type:String, required:true},
    phone:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    city:{type:String, required:true}
})
const PhoneBookModel = connection.model(config.MODELS.PHONE_BOOK, phoneBookSchema);
module.exports = PhoneBookModel;