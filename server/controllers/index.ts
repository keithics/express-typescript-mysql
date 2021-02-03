import {Request, Response} from 'express';
const _ = require('lodash');

export class IndexController{

    public home(req: Request, res: Response){
        res.sendStatus(404);
    }


}
