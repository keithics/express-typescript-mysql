import {ErrorHandlerController} from '../controllers/error.handler.controller';
const _ = require('lodash');

/**
 * Returns the right json response or Error
 * @param res Express Response
 * @param err Error Response
 * @param data Data to parse
 */
export const BaseResponse = (res,err,data) => {

    if(err){
        return ErrorResponse(res,err)
    }else{
        res.json(data)
    }

}

/**
 * Sends an {message:'OK'} response
 * @param res Express Response
 */
export const OkResponse = (res) => {
    res.json({message:'OK'})
}

/**
 * Returns a valid response if the data is not null, otherwise and Error
 * @param res Express Response
 * @param data JSON data
 */
export const SuccessResponse = (res,data) => {
    if(data){
        res.json(data)
    }else{
        ErrorResponse(res,{message:'Data is null',code:422})
    }
}

/**
 * Filters the mesage based on the error message
 * @param err Error Message
 * @param code Status code
 */
const filterMessage = (err,code) => {
    return {message:ErrorHandlerController.getErrorMessage(err),code:422}
}

/**
 * Returns an Error Response and hide them from the client
 * @param res Express Response
 * @param err Error Object
 */
export const ErrorResponse = (res,err)=>{

    try{
        const code = err?.code || 500;
        const errorData = filterMessage(err,code)
        return res.status(errorData.code).send(errorData);
    }catch (e) {
        return res.status(500).send({
            message: 'Server Error Occurred'
        });
    }

}



