const express = require('express');
const config = require('../config');
const phoneBookController = require('../controllers/phonebook');
const phoneBookRoute = express.Router();
phoneBookRoute.post(config.ROUTES.PHONEBOOK.ADD, phoneBookController.addPhoneRecord);
phoneBookRoute.get(config.ROUTES.PHONEBOOK.GET_RECORDS, phoneBookController.getPhoneRecords);
phoneBookRoute.put(config.ROUTES.PHONEBOOK.UPDATE, phoneBookController.updateRecord);
phoneBookRoute.delete(config.ROUTES.PHONEBOOK.DELETE, phoneBookController.deleteRecord);
module.exports = phoneBookRoute;