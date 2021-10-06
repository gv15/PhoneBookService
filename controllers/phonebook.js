const express = require('express');
const phoneBookCRUD = require('../db/services/phonebook');
const phoneBookValidation = require("../db/validations/phonebook");
const joi = require('joi');
const util = require('../util');

const phoneBookController = {
    addPhoneRecord(request, response) {
       
        let validationResult = phoneBookValidation.validate(request.body, {abortEarly:false});
       
        
       
        if (validationResult.error) {
            let reason = {};
            validationResult.error.details.map(error=>{
                reason[error.path[0]] = error.message
            })
            response.status(400).json({
                message: "Invalid data",
                reason
            })
        }
        else {
            phoneBookCRUD.addPhone(request.body).then(() => {
                response.status(200).json({
                    "message": "Record added sucessfully"
                }
                )
            }).catch(err=>{
               let reason = util.giveErrorReason(err);
                response.status(502).json({
                    message:"Database error occured while adding record",
                    reason
                })
            })
        }
    },
    deleteRecord(request, response){
      phoneBookCRUD.deletePhone(request.query).then(
          deleteInfo=>{
              if(deleteInfo.deletedCount>0){
                response.status(200).json({
                    message:"records deleted"
                })
              }
              else{
                  response.status(404).json({
                      message:"No record found with that filter"
                  })
              }
          }).catch(err=>{
              response.status(502).json({
                  message:"Some database error has occured"
              })
          })
      
    },
    getPhoneRecords(request, response){
        console.log(request.query)
       if(request.query.limit){
            var {limit, ...filter} = request.query;
       }
       else{
           var filter = request.query;
       }
        phoneBookCRUD.getPhoneRecords(filter).then(records=>{
            
            if(records.length>0){
                if(limit){
                    if(limit<=0){
                        response.status(400).json(
                            {message:"Limit must be greater than 0"}
                        )
                    }
                    else{
                        records.length = limit;
                    }
                }
                response.status(200).json({
                    records
                })
            }
            else{
                response.status(400).json({
                    message:"no record with that filter"
                })
            }
        })

    },
    updateRecord(request, response){
        let validationResult = joi.string().length(10).pattern(new RegExp('^[0-9]+$')).required().validate(request.body.phone);
        if(validationResult.error){
            response.status(400).json(
               { message:"Phone Invalid"}
            )
        }
        var {phone, updationFields} = request.body;
        phoneBookCRUD.updatePhone(phone, updationFields).then(
            updateInfo=>{
                if(updateInfo.modifiedCount>0){
                    response.status(200).json({
                        message:"Record updated successfully"
                    })
                }
                else{
                    response.status(404).json(
                        {message:"record not found"}
                    )
                }
            }
        ).catch(err=>{
            response.status(502).json(
                {
                    message:"Database error while updating",err
                }
            )
        })
    }
}
module.exports = phoneBookController;