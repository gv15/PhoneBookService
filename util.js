const util = {
     giveErrorReason(err){
        let reason = '';
        
        if (err["name"] == "ValidationError") {
            if (err["message"].includes('required')) {
                reason = string(err["message"]).replaceAll("Path", "Field").s;//third party string library used
                reason = string(reason).replaceAll("required", "missing").s;
                
            }
            else
            //doubt
            if(err["message"].includes('unique')){
               
                let errorValues = err['errors'];
                for(let key in errorValues){
                    reason+=`${key} ${errorValues[key]["value"]}, `;
                }
                reason+="already present";
            }
    
        }
        return reason;
    
    }
}
module.exports = util;