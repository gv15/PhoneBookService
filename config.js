const config  = {
    ROUTES:{
        PHONEBOOK:{
            PRIMARY:"/phone",
            DELETE:"/delete",
            GET_RECORDS:"/get",
            ADD:"/add",
            UPDATE:"/update"
        }
    },
    MODELS:{
        PHONE_BOOK:"phonerecord"
    }
}
module.exports = config;