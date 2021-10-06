const PhoneBookModel = require("../schemas/phonebook");

const phoneBookCRUD = {
    addPhone(phoneRecord){
        return PhoneBookModel.create(phoneRecord);
    },
    deletePhone(filter){
        return PhoneBookModel.deleteMany(filter);
    },
    updatePhone(phone, updationFields){
        return PhoneBookModel.updateOne({phone}, {$set:updationFields});
    },
    getPhoneRecords(filter){
        return PhoneBookModel.find(filter);
    }
}

module.exports = phoneBookCRUD;