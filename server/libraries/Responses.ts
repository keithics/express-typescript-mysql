import {ErrorHandlerController} from '../controllers/error.handler.controller';


const _ = require('lodash');


export const BaseResponse = (res,err,data) => {

    if(err){
        return ErrorResponse(res,err)
    }else{
        res.json(data)
    }

}

export const OkResponse = (res) => {
    res.json({message:'OK'})
}

export const SuccessResponse = (res,data) => {
    if(data){
        res.json(data)
    }else{
        ErrorResponse(res,{message:'Data is null',code:422})
    }
}

const filterMessage = (err,code) => {
    return {message:ErrorHandlerController.getErrorMessage(err),code:422}
}

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



