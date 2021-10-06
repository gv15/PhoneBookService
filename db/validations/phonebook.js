const joi = require('joi');
const phoneBookValidation = joi.object({
    name:joi.string().required().pattern(new RegExp('^[A-Za-z ]+$')),
    phone:joi.string().pattern(new RegExp('^[0-9]+$')).length(10).required(),
    email:joi.string().email().required(),
    city:joi.string().required()
})
module.exports = phoneBookValidation;